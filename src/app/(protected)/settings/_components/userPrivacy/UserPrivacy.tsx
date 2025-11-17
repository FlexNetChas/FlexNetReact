"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {};

export default function UserPrivacy({}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleCookieSettings = () => {
    if (!isMounted) return;

    // Find the CookieYes manage button in the DOM
    const cookieYesManageBtn = document.querySelector(
      '#cookieyes-manage-btn, .cky-btn-preferences, button[data-cky-btn="preferences"]'
    ) as HTMLButtonElement | null;

    if (cookieYesManageBtn) {
      cookieYesManageBtn.click();
      return;
    }

    console.warn("Coudln't find CookieYes manage button in the DOM");
  };

  return (
    <div className="space-y-5">
      {/* Data Management */}
      <div className="setting-section-layout">
        <div className="p-5">
          <h3>Data Management</h3>
          <p className="text-muted-foreground mt-2">
            Download a copy of your personal data
          </p>
        </div>
        <div className="p-5">
          <Button variant="default" className="mb-2">
            Request Data Export
          </Button>
        </div>
      </div>

      {/* Section Divider */}
      <div className="border-border -mx-6 border-t" />

      {/* Cookie Preferences */}
      <div className="setting-section-layout">
        <div className="p-5">
          <h3>Cookie Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Manage your cookie settings and privacy preferences.
          </p>
        </div>
        <div className="p-5">
          <Button
            variant="default"
            className="mb-2"
            onClick={handleCookieSettings}
          >
            Manage Cookie Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
