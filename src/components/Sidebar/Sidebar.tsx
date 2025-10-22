"use client";
import Link from "next/link";
import {
  Book,
  Search,
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api/actions/authActions";
import { useFormStatus } from "react-dom";

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
    <aside
      className={`h-screen bg-gray-950/20 backdrop-blur-2xl border-r border-gray-800 text-white flex flex-col transition-all duration-300 ${
        isMinimized ? "w-16 items-center" : "w-64"
      }`}
    >
      {/* Open close sidebar & lil animation */}
      <div
        className={`flex items-center justify-between w-full px-3 ${
          isMinimized ? "flex-col gap-3 pt-3 pb-2" : "h-16"
        }`}
      >
        {!isMinimized && (
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
        )}
        <button
          onClick={toggleSidebar}
          title={isMinimized ? "Open Sidebar" : "Close Sidebar"}
          className="text-white hover:text-gray-400 focus:outline-none transition-all duration-300 p-2 cursor-pointer rounded-md hover:bg-gray-800"
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* User Info Section */}
      {!isMinimized && user && (
        <div className="px-3 py-3">
          <div className="text-sm">
            <p className="font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      )}

      {/* Border after user info */}
      {!isMinimized && <div className="border-t border-gray-800 mx-3"></div>}

      {/* Menu section, temp buttons in same file here sicne layout and flow not finalized */}
      <div
        className={`flex flex-col gap-1${
          isMinimized ? "items-center py-3" : "items-start px-3 py-3"
        }`}
      >
        <Button
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
          className={`${
            isMinimized ? "justify-center" : "justify-start"
          } flex w-full gap-2`}
          title={"New chat"}
        >
          <Link href={"/chat"} className="flex items-center gap-2 w-full">
            {<SquarePen size={18} />}
            {!isMinimized && <span className="text-sm">{"New chat"}</span>}
          </Link>
        </Button>

        <Button
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
          className={`${
            isMinimized ? "justify-center" : "justify-start"
          } flex w-full gap-2`}
          title={"Search chats"}
        >
          <Link href={"/chat"} className="flex items-center gap-2 w-full">
            {<Search size={18} />}
            {!isMinimized && <span className="text-sm">{"Search chats"}</span>}
          </Link>
        </Button>

        <Button
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
          className={`${
            isMinimized ? "justify-center" : "justify-start"
          } flex w-full gap-2`}
          title={"Library"}
        >
          <Link href={"/chat"} className="flex items-center gap-2 w-full">
            {<Book size={18} />}
            {!isMinimized && <span className="text-sm">{"Library"}</span>}
          </Link>
        </Button>

        <Button
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
          className={`${
            isMinimized ? "justify-center" : "justify-start"
          } flex w-full gap-2`}
          title={"Settings"}
        >
          <Link href={"/settings"} className="flex items-center gap-2 w-full">
            <Settings size={18} />
            {!isMinimized && <span className="text-sm">Settings</span>}
          </Link>
        </Button>

        {/* Logout Button */}
        <Button
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
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
              <span className="text-sm">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            )}
          </div>
        </Button>
      </div>

      {/* Border after settings */}
      {!isMinimized && <div className="border-t border-gray-800 mx-3"></div>}

      {/* Previous chats listed here, scrollable window. Getting previous chats and handling onclick setup chat logic should be handled elsewhere, 
      this here just handle the visual and onclick call  */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-hide">
          <Section title="Projects">
            <SectionItem text="Temp1" />
            <SectionItem text="Temp2" />
            <SectionItem text="Temp3" />
          </Section>

          <Section title="Chats">
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
            <SectionItem text="Lorem ipsum dolor sit amet" />
          </Section>
        </div>
      )}
    </aside>
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

// helper for each item in a Section, depends on how we handle it but this probalby comes from a component handling backend data fetching, and it contains an id,
// so these can act as buttons to load a specific chat session.
function SectionItem({ text }: { text: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chat"); // Replace with actual chat session route /chat/[id] have that page handle setup too.
  };

  return (
    <div
      onClick={handleClick}
      className="p-3  rounded hover:bg-gray-700 transition-colors cursor-pointer text-sm"
    >
      {text}
    </div>
  );
}
