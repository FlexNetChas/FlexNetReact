"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { exportUserData } from "@/lib/api/actions/userDataExportActions";
import { Download, Loader2 } from "lucide-react";

interface CookieYesAPI {
  show: () => void;
}

declare global {
  interface Window {
    CookieYes?: CookieYesAPI;
  }
}

export default function UserPrivacy({}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

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

    if (window.CookieYes) {
      window.CookieYes.show();
      return;
    }
  };
  const handleDataExport = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      const result = await exportUserData();

      if (!result.success || !result.data) {
        setExportError(result.error ?? "Failed to export data");
        return;
      }

      // Convert blob to download
      const url = window.URL.createObjectURL(result.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `flexnet-userdata-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Optional: Show success message for a few seconds
      // You could add a success state here if you want
    } catch (err) {
      setExportError("Failed to export data. Please try again.");
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
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
          <Button
            variant="default"
            className="mb-2"
            onClick={handleDataExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Request Data Export
              </>
            )}
          </Button>

          {exportError && (
            <p className="mt-2 text-sm text-red-500">{exportError}</p>
          )}

          <p className="text-muted-foreground mt-3 text-xs">
            GDPR Article 20 - Right to Data Portability
          </p>
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
