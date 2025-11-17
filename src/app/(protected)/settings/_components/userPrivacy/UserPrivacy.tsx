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

    const cookieYesButtons = [
      ".cky-btn-revisit",
      'button[data-cky-tag="settings-button"]',
      ".cky-btn-customize",
      "#ckyPreferenceCenter",
    ];

    for (const selector of cookieYesButtons) {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element) {
        element.click();
        return;
      }
    }

    if (typeof window !== "undefined" && (window as any).CookieYes) {
      (window as any).CookieYes.show();
      return;
    }
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
