"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";

export default function WebsiteListPage() {
  const { session, loading } = useAuth();
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch the user's blocked websites from Supabase
  useEffect(() => {
    async function fetchBlockedWebsites() {
      if (!session?.user.id) return;

      try {
        setIsLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
          .from("users")
          .select("blocked_websites")
          .eq("id", session.user.id)
          .single();

        if (error) {
          throw error;
        }

        // If the user has blocked websites, set them in state
        if (data && data.blocked_websites) {
          setWebsites(
            Array.isArray(data.blocked_websites) ? data.blocked_websites : []
          );
        }
      } catch (err: any) {
        console.error("Error fetching blocked websites:", err);
        setError(err.message || "Failed to load blocked websites");
      } finally {
        setIsLoading(false);
      }
    }

    if (session && !loading) {
      fetchBlockedWebsites();
    }
  }, [session, loading]);

  // Handle adding a new website
  const handleAddWebsite = () => {
    if (!newWebsite) return;

    // Simple validation for website format
    let websiteToAdd = newWebsite.trim();

    // If website doesn't include http:// or https://, add https://
    if (
      !websiteToAdd.startsWith("http://") &&
      !websiteToAdd.startsWith("https://")
    ) {
      websiteToAdd = `https://${websiteToAdd}`;
    }

    // Check if website already exists in the list (case insensitive)
    const isDuplicate = websites.some(
      (site) => site.toLowerCase() === websiteToAdd.toLowerCase()
    );

    if (isDuplicate) {
      setError("This website is already in your blocked list");
      return;
    }

    // Add the new website to the list
    setWebsites((prev) => [...prev, websiteToAdd]);
    setNewWebsite("");
    setError(null);
  };

  // Handle removing a website
  const handleRemoveWebsite = (websiteToRemove: string) => {
    setWebsites((prev) =>
      prev.filter((website) => website !== websiteToRemove)
    );
  };

  // Handle saving the websites to Supabase
  const handleSaveWebsites = async () => {
    if (!session?.user.id) return;

    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const supabase = createClient();

      const { error } = await supabase
        .from("users")
        .update({
          blocked_websites: websites,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (error) {
        throw error;
      }

      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Error saving blocked websites:", err);
      setError(err.message || "Failed to save blocked websites");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle keypress to add website when Enter is pressed
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWebsite();
    }
  };

  if (loading || isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Blocked Websites</h2>
          <p className="text-muted-foreground mt-2">
            Manage your list of blocked websites
          </p>
        </div>
        <div className="flex items-center justify-center h-60">
          <div className="text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading your blocked websites...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Blocked Websites</h2>
        <p className="text-muted-foreground mt-2">
          Add and manage websites you want to block
        </p>
      </div>

      {/* Add website form */}
      <div className="border-t pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-website">Add a website to block</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="new-website"
                placeholder="Enter website URL (e.g., facebook.com)"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleAddWebsite}
                disabled={!newWebsite.trim()}
                variant="secondary"
              >
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the domain name you want to block (e.g., facebook.com,
              twitter.com)
            </p>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {/* Website list */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Your blocked websites</h3>

        {websites.length === 0 ? (
          <div className="bg-muted/50 border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">
              You haven't added any websites to block yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {websites.map((website, index) => (
                <Badge
                  key={`${website}-${index}`}
                  variant="secondary"
                  className="py-1 px-3 flex items-center gap-2"
                >
                  <span>{new URL(website).hostname.replace("www.", "")}</span>
                  <button
                    onClick={() => handleRemoveWebsite(website)}
                    className="ml-1 text-muted-foreground hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="sr-only">Remove {website}</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          {saveSuccess && (
            <p className="text-sm text-green-600">
              ✓ Your blocked websites have been saved successfully
            </p>
          )}
        </div>
        <Button
          onClick={handleSaveWebsites}
          disabled={isSaving || websites.length === 0}
          variant="primary"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
