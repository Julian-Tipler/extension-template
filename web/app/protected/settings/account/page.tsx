"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and public profile
        </p>
      </div>

      <div className="border-t pt-6">
        <form className="space-y-6">
          {/* Profile image */}
          <div className="flex items-center gap-x-6">
            <div className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
              <span className="text-xl font-semibold">JD</span>
              {/* You can add an image here with next/image */}
            </div>
            <div>
              <Button variant="secondary" size="sm">
                Change Your Mom
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                JPG, PNG, or GIF. 1MB max.
              </p>
            </div>
          </div>

          {/* Name fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="First name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Last name" />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
            <p className="text-xs text-muted-foreground">
              This email will be used for important notifications
            </p>
          </div>
          {/* Preferences section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing-emails" />
                <Label htmlFor="marketing-emails">
                  Receive marketing emails
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="product-updates" />
                <Label htmlFor="product-updates">
                  Receive product update notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" defaultChecked />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dark-mode" />
                <Label htmlFor="dark-mode">Enable dark mode by default</Label>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
