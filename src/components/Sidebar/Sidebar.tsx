"use client";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Settings,
  LogOut,
  Book,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import SectionItems from "./SectionItem";
import { logout } from "@/lib/sharedActions";
import { useRouter } from "next/navigation";

export default function PreviousChatSessions() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const toggleSidebar = () => setIsMinimized((prev) => !prev);
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button - only visible on mobile when sidebar is closed */}
      {!isMinimized && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-5 rounded-lg border border-gray-700 p-2 hover:bg-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <aside
        className={`bg-background border-border fixed top-0 left-0 z-50 flex h-screen flex-col border-r backdrop-blur-lg md:relative ${isMinimized ? "w-64 md:w-20 md:items-center" : "w-64"} ${
          isMinimized ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } `}
      >
        {/* Close btn on mobil displays */}
        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="hover:bg-primary/10 absolute top-4 right-4 rounded-lg border border-gray-700 bg-blue-950 p-1 md:hidden"
            aria-label="Close menu"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Open close sidebar & lil animation */}
        <div
          className={`flex w-full items-center justify-between px-3 ${
            isMinimized ? "flex-col gap-3 pt-3 pb-2" : "h-16"
          }`}
        >
          {!isMinimized && (
            <Link href="/dashboard">
              <div className="size-10 overflow-hidden rounded-md">
                <video
                  src="/3d-assets/2d-animateda.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full bg-transparent object-cover"
                />
              </div>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            title={isMinimized ? "Open Sidebar" : "Close Sidebar"}
            className="hover:text-muted-foreground hidden cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-gray-800 focus:outline-none md:block"
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
                <p className="truncate font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </Link>
              <p className="text-muted-foreground truncate text-xs">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {isMinimized && user && (
          <div className="mt-8 px-3 py-3 md:hidden">
            <div className="flex items-center gap-4 bg-transparent">
              <video
                src="/3d-assets/2d-animated.webm"
                autoPlay
                loop
                muted
                playsInline
                className="size-15 bg-transparent object-cover"
              />
              <div className="text-sm">
                <p className="truncate font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Border after user info */}
        {!isMinimized && (
          <div className="border-border mx-2 hidden border-t md:inline"></div>
        )}
        {isMinimized && (
          <div className="border-border mx-2 inline border-t md:hidden"></div>
        )}

        {/* Menu section, temp buttons in same file here sicne layout and flow not finalized */}
        <div
          className={`flex flex-col gap-3 p-2 ${
            isMinimized ? "items-center py-3" : "items-start px-3 py-3"
          }`}
        >
          {/* Home */}
          <Button
            variant="default"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"Home"}
            onClick={() => setIsMinimized(false)}
          >
            <Link
              href={"/"}
              className="flex w-full items-center gap-2 no-underline"
            >
              {<Book size={18} />}
              {!isMinimized && (
                <span className="hidden text-sm md:inline">Home</span>
              )}
              {isMinimized && <span className="text-sm md:hidden">Home</span>}
            </Link>
          </Button>

          {/* New Chat */}
          <Button
            variant="default"
            size="default"
            className={`cursor-pointer !no-underline ${
              isMinimized ? "justify-center" : "justify-start"
            } text-primary flex w-full gap-2 hover:underline`}
            title="New chat"
            onClick={async () => {
              setIsMinimized(false);
              await router.push(`/chat?ts=${Date.now()}`);
              router.refresh();
            }}
          >
            <div className="flex w-full items-center gap-2 no-underline">
              <SquarePen size={18} />
              {!isMinimized && (
                <span className="hidden text-sm md:inline">New chat</span>
              )}
              {isMinimized && (
                <span className="text-sm md:hidden">New chat</span>
              )}
            </div>
          </Button>

          {/* Settings */}
          <Button
            variant="default"
            size="default"
            className={`${
              isMinimized ? "justify-center" : "justify-start"
            } flex w-full gap-2`}
            title={"Settings"}
            onClick={() => setIsMinimized(false)}
          >
            <Link
              href={"/settings"}
              className="flex w-full items-center gap-2 no-underline"
            >
              <Settings size={18} />
              {!isMinimized && (
                <span className="hidden text-sm md:inline">Settings</span>
              )}
              {isMinimized && (
                <span className="text-sm md:hidden">Settings</span>
              )}
            </Link>
          </Button>

          {/* Logout Button */}
          <Button
            variant="default"
            size="default"
            className={`cursor-pointer !no-underline ${
              isMinimized ? "justify-center" : "justify-start"
            } text-primary flex w-full gap-2 hover:underline`}
            title="Logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <div className="flex w-full items-center gap-2">
              <LogOut size={18} />
              {!isMinimized && (
                <span className="hidden text-sm md:inline">Logout</span>
              )}
              {isMinimized && (
                <span className="text-sm md:hidden">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </div>
          </Button>
        </div>

        {/* Border after settings */}
        {!isMinimized && (
          <div className="border-border mx-2 hidden border-t md:inline"></div>
        )}
        {isMinimized && (
          <div className="border-border-primary/60 mx-2 inline border-t md:hidden"></div>
        )}

        {/* Previous chats listed here, scrollable window. Getting previous chats and handling onclick setup chat logic should be handled elsewhere, 
      this here just handle the visual and onclick call  */}
        {!isMinimized && (
          <div className="scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-4">
            {/* <Section title="Projects">
              <SectionItems />
            </Section> */}

            <Section title="Chats">
              <SectionItems />
            </Section>
          </div>
        )}

        {isMinimized && (
          <div className="scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-4 md:hidden">
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
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}
