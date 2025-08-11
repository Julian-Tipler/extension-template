"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Settings Card - Profile */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your personal information and account settings
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push("/protected/settings/profile")}
          >
            Manage Account
          </Button>
        </div>

        {/* Settings Card - Account */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Update your account preferences and settings
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push("/protected/settings/account")}
          >
            Account Settings
          </Button>
        </div>

        {/* Settings Card - Billing */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Billing</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your subscription and payment methods
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push("/protected/settings/billing")}
          >
            Billing Information
          </Button>
        </div>

        {/* Settings Card - Purchases */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Purchases</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View your purchase history and receipts
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push("/protected/settings/purchases")}
          >
            View Purchases
          </Button>
        </div>
        
        {/* Settings Card - Website List */}
        <div className="bg-card border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Website List</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your blocked websites
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push("/protected/settings/website-list")}
          >
            Manage Websites
          </Button>
        </div>
      </div>
    </div>
  );
}
