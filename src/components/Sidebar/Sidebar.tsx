"use client";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api/actions/authActions";
import SectionItems from "./SectionItem";

export default function PreviousChatSessions() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const toggleSidebar = () => setIsMinimized((prev) => !prev);
  const user = useUser();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button - only visible on mobile when sidebar is closed */}
      {!isMinimized && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-5 p-2 rounded-lg hover:bg-gray-800 border border-gray-700"
          aria-label="Toggle menu"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <aside
        className={`
          fixed md:relative
          top-0 left-0
          h-screen bg-gray-900/70 backdrop-blur-lg border-r border-border
          flex flex-col
          z-50
          ${isMinimized ? "md:w-16 md:items-center w-64" : "w-64"}
          ${
            isMinimized ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Close btn on mobil displays */}
        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="md:hidden absolute top-4 right-4 p-1 rounded-lg bg-blue-950 hover:bg-primary/10 border border-gray-700"
            aria-label="Close menu"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Open close sidebar & lil animation */}
        <div
          className={`flex items-center justify-between w-full px-3 ${
            isMinimized ? "flex-col gap-3 pt-3 pb-2" : "h-16"
          }`}
        >
          {!isMinimized && (
            <Link href="/dashboard">
              <div className="w-10 h-10 overflow-hidden rounded-md">
                <video
                  src="/3d-assets/2d-animated.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            title={isMinimized ? "Open Sidebar" : "Close Sidebar"}
            className="hidden md:block text-white hover:text-gray-400 focus:outline-none transition-all duration-300 p-2 cursor-pointer rounded-md hover:bg-gray-800"
          >
            {isMinimized ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* User Info Section */}
        {!isMinimized && user && (
          <div className="px-3 py-3">
            <div className="text-sm">
              <Link href="/dashboard">
                <p className="font-semibold text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
              </Link>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {isMinimized && user && (
          <div className="md:hidden px-3 py-3 mt-8">
            <div className="flex gap-4 items-center">
              <video
                src="/3d-assets/2d-animated.webm"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-15 h-15"
              />
              <div className="text-sm">
                <p className="font-semibold text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Border after user info */}
        {!isMinimized && (
          <div className="hidden md:inline border-t border border-primary/60 mx-2"></div>
        )}
        {isMinimized && (
          <div className="md:hidden inline border-t border border-primary/60 mx-2"></div>
        )}

        {/* Menu section, temp buttons in same file here sicne layout and flow not finalized */}
        <div
          className={`flex flex-col gap-1${
            isMinimized ? "items-center py-3" : "items-start px-3 py-3"
          }`}
        >
          <Button
            variant="sidebar"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"New chat"}
          >
            <Link href={"/chat"} className="flex items-center gap-2 w-full">
              <SquarePen size={18} />
              {!isMinimized && (
                <span className="hidden md:inline text-sm">New chat</span>
              )}
              {isMinimized && (
                <span className="md:hidden text-sm">New chat</span>
              )}
            </Link>
          </Button>

          {/* <Button
            variant="sidebar"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"Search chats"}
          >
            <Link href={"/chat"} className="flex items-center gap-2 w-full">
              {<Search size={18} />}
              {!isMinimized && (
                <span className="hidden md:inline text-sm">Search chat</span>
              )}
              {isMinimized && (
                <span className="md:hidden text-sm">Search chat</span>
              )}
            </Link>
          </Button> */}

          {/* /// Library Button - currently commented out */}
          {/* <Button
            variant="sidebar"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"Library"}
          >
            <Link href={"/chat"} className="flex items-center gap-2 w-full">
              {<Book size={18} />}
              {!isMinimized && (
                <span className="hidden md:inline text-sm">Library</span>
              )}
              {isMinimized && (
                <span className="md:hidden text-sm">Library</span>
              )}
            </Link>
          </Button> */}

          <Button
            variant="sidebar"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"Settings"}
          >
            <Link href={"/settings"} className="flex items-center gap-2 w-full">
              <Settings size={18} />
              {!isMinimized && (
                <span className="hidden md:inline text-sm">Settings</span>
              )}
              {isMinimized && (
                <span className="md:hidden text-sm">Settings</span>
              )}
            </Link>
          </Button>

          {/* Logout Button */}
          <Button
            variant="sidebar"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2 text-primary hover:underline`}
            title="Logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <div className="flex items-center gap-2 w-full">
              <LogOut size={18} />
              {!isMinimized && (
                <span className="hidden md:inline text-sm">Logout</span>
              )}
              {isMinimized && (
                <span className="md:hidden text-sm">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </div>
          </Button>
        </div>

        {/* Border after settings */}
        {!isMinimized && (
          <div className="hidden md:inline border-t border border-primary/60 mx-2"></div>
        )}
        {isMinimized && (
          <div className="md:hidden inline border-t border border-primary/60 mx-2"></div>
        )}

        {/* Previous chats listed here, scrollable window. Getting previous chats and handling onclick setup chat logic should be handled elsewhere, 
      this here just handle the visual and onclick call  */}
        {!isMinimized && (
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar">
            {/* <Section title="Projects">
              <SectionItems />
            </Section> */}

            <Section title="Chats">
              <SectionItems />
            </Section>
          </div>
        )}

        {isMinimized && (
          <div className="md:hidden flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar">
            {/* <Section title="Projects">
              <SectionItems />
            </Section> */}

            <Section title="Chats">
              <SectionItems />
            </Section>
          </div>
        )}
      </aside>
    </>
  );
}

// helper to group sessions into sections in the sidebar e.g Projects, Previous Chats. copied gpt structure, we probably don't want this exact structure.
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 text-gray-400">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
