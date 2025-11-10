"use client";

import React, { useState, useEffect } from "react";
import { requireAuth } from "@/lib/sharedActions";
import { getUserDescription } from "./actions";
import UserPrivacy from "./_components/userPrivacy/UserPrivacy";
import UserPreference from "./_components/userPreference/UserPreference";
import UserProfileContent from "./_components/userProfile/UserProfileContent";

type Tab = "profile" | "preferences" | "privacy";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [user, setUser] = useState<any>(null);
  const [userDescription, setUserDescription] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const userSession = await requireAuth();
      const userDescription = await getUserDescription(userSession.id);
      setUser(userSession);
      setUserDescription(userDescription);
    }
    fetchData();
  }, []);

  if (!user || !userDescription) {
    return <div className="p-6">Loading...</div>;
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
    <div className="min-h-screen mx-auto ">
      {/* Tabs */}
      <div className="border-b border-t border-border p-5 ">
        <nav className="flex space-x-8">
          {[
            { key: "profile" as Tab, label: "Profile" },
            { key: "preferences" as Tab, label: "Preferences" },
            { key: "privacy" as Tab, label: "Privacy" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={` ${activeTab === tab.key ? "text-primary " : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Render Tab Content */}
      <div className="space-y-8">{renderContent()}</div>
    </div>
  );
}
