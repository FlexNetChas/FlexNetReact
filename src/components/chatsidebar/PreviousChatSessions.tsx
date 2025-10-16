"use client";
import Link from "next/link";
import {
  Book,
  Search,
  ChevronLeft,
  ChevronRight,
  SquarePen,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function PreviousChatSessions() {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleSidebar = () => setIsMinimized((prev) => !prev);

  return (
    <aside
      className={`h-screen bg-gray-950 border-r border-gray-700 text-white flex flex-col transition-all duration-300 ${
        isMinimized ? "w-16 items-center" : "w-64"
      }`}
    >
      {/* Open close sidebar & lil animation */}
      <div
        className={`flex items-center justify-between w-full border-gray-800 px-3 ${
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
          className="text-white hover:text-gray-400 focus:outline-none transition-all duration-300 p-2"
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu section, temp buttons in same file here sicne layout and flow not finalized */}
      <div
        className={`flex flex-col gap-2  border-gray-800 ${
          isMinimized ? "items-center py-3" : "items-start px-3 py-3"
        }`}
      >
        <Button
          asChild
          variant="sidebar"
          size={isMinimized ? "icon" : "default"}
          className={`${
            isMinimized ? "justify-center" : "justify-start"
          } flex w-full gap-2`}
          title={"New Chat"}
        >
          <Link href={"/testpage"} className="flex items-center gap-2 w-full">
            {<SquarePen size={18} />}
            {!isMinimized && <span className="text-sm">{"New Chat"}</span>}
          </Link>
        </Button>
        <SidebarButton
          href="/testpage"
          icon={<Search size={18} />}
          label="Search Chats"
          isMinimized={isMinimized}
        />
        <SidebarButton
          href="/testpage"
          icon={<Book size={18} />}
          label="Library"
          isMinimized={isMinimized}
        />
      </div>

      {/* Previous chats listed here, scrollable window. Getting previous chats and handling onclick setup chat logic should be handled elsewhere, 
      this here just handle the visual and onclick call  */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <Section title="Projects">
            <SectionItem text="Temp1" />
            <SectionItem text="Temp2" />
            <SectionItem text="Temp3" />
          </Section>

          <Section title="Previous Chats">
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

{
  /* temp buttons to get feel for the visuals, layout not finalized */
}
function SidebarButton({
  href,
  icon,
  label,
  isMinimized,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isMinimized: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={`flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-800 transition-colors w-full ${
        isMinimized ? "justify-center" : "justify-start"
      }`}
    >
      {icon}
      {!isMinimized && <span className="text-sm">{label}</span>}
    </Link>
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
      <h3 className="text-sm font-semibold mb-2 text-gray-300">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

// helper for each item in a Section, depends on how we handle it but this probalby comes from a component handling backend data fetching, and it contains an id,
// so these can act as buttons to load a specific chat session.
function SectionItem({ text }: { text: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/testpage");
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors cursor-pointer text-sm"
    >
      {text}
    </div>
  );
}
