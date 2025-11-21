"use client";

import { useState, useEffect } from "react";
import { requireAuth } from "@/lib/sharedActions";
import { getUserDescription } from "./actions";
import UserPrivacy from "./_components/userPrivacy/UserPrivacy";
import UserPreference from "./_components/userPreference/UserPreference";
import UserProfileContent from "./_components/userProfile/UserProfileContent";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { UserDescription } from "@/types/userDescription";
import { SessionUser } from "@/types/user";
import { Section } from "@/components/layout/Section";

type Tab = "profile" | "preferences" | "privacy";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [userDescription, setUserDescription] =
    useState<UserDescription | null>(null);

  useEffect(() => {
    async function fetchData() {
      const userSession: SessionUser = await requireAuth();
      const description = await getUserDescription(userSession.id);

      if (!description) {
        throw new Error("User description not found");
      }

      setUser(userSession);
      setUserDescription(description);
    }
    fetchData();
  }, []);

  if (!user || !userDescription) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <UserProfileContent user={user} userDescription={userDescription} />
        );
      case "preferences":
        return <UserPreference />;
      case "privacy":
        return <UserPrivacy />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tabs */}
      <nav className="mt-12 ml-6 flex space-x-10">
        {[
          { key: "profile" as Tab, label: "Profile" },
          { key: "preferences" as Tab, label: "Preferences" },
          { key: "privacy" as Tab, label: "Privacy" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={` ${activeTab === tab.key ? "text-primary" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <Section spacing="none" className="mt-6 overflow-hidden">
        {/* Section Divider */}
        <div className="border-border -mx-6 border-t" />
        {/* Render Tab Content */}
        <div>{renderContent()}</div>
      </Section>
    </>
  );
}
