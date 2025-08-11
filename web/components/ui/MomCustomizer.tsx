"use client";
import { BRAND_NAME } from "@/lib/siteConfig";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/context/AuthProvider";
import { useModal } from "@/app/context/ModalContext";

type Mom = {
  id: string; // UUID in Supabase
  assetUrl: string;
  name?: string;
  price?: number;
  description?: string;
  stripePriceId?: string;
};

export default function MomCustomizer() {
  const [moms, setMoms] = useState<Mom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [momIndex, setMomIndex] = useState(0);
  const [expression, setExpression] = useState<"happy" | "sad">("happy");
  const { session, loading: authLoading } = useAuth();
  const { showModal } = useModal();

  const productId = moms[momIndex]?.id;
  const redirectLink = `/protected/checkout-start?productId=${productId}`;

  useEffect(() => {
    const fetchMoms = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("id, assetUrl, name, price")
          .order("price", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setMoms(data);
        } else {
          setError("No mom products found");
          setMoms([]);
        }
      } catch (err) {
        console.error("Error fetching moms:", err);
        setError("Failed to load moms");
        setMoms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoms();
  }, []);

  const getImageUrl = (mom: Mom, state: "happy" | "sad") => {
    if (!mom?.assetUrl) return "";

    // Get the base asset URL, removing any trailing slashes
    let baseUrl = mom.assetUrl.trim();
    baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    // Extract the file extension if present
    const hasExtension = baseUrl.match(/\.(png|jpg|jpeg|gif|webp)$/i);

    if (hasExtension) {
      // If the URL already has an extension, insert the state before the extension
      const extension = hasExtension[0];
      const basePath = baseUrl.substring(0, baseUrl.length - extension.length);
      return `${basePath}-${state}${extension}`;
    } else {
      // If no extension, simply append the state and .png
      return `${baseUrl}-${state}.png`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Large preview of selected mom */}
      <div className="relative bg-gray-50 p-8 rounded-lg flex justify-center items-center w-full">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : moms.length > 0 ? (
          <Image
            src={getImageUrl(moms[momIndex], expression)}
            alt={`${
              moms[momIndex]?.name || `Mom ${momIndex + 1}`
            } (${expression})`}
            width={128}
            height={128}
            className="object-contain transform transition-all duration-300 hover:scale-110"
            style={{ imageRendering: "pixelated" }}
            priority
          />
        ) : (
          <div className="text-red-500">No moms available</div>
        )}
      </div>

      {/* Mood selection */}
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={() => setExpression("happy")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            expression === "happy"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span className="text-xl">😊</span>
          <span>Happy</span>
        </button>
        <button
          onClick={() => setExpression("sad")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            expression === "sad"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span className="text-xl">😢</span>
          <span>Sad</span>
        </button>
      </div>

      {/* Mom selection */}
      <div className="w-full">
        <h3 className="text-gray-500 text-sm font-medium mb-3 text-center">
          Choose Your Mom:
        </h3>
        {loading ? (
          <div className="grid grid-cols-3 gap-3 w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-100 animate-pulse h-24"
              >
                <div className="w-12 h-12 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 w-full">
            {moms.map((mom, i) => (
              <button
                key={mom.id}
                onClick={() => setMomIndex(i)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  momIndex === i
                    ? "bg-purple-100 ring-2 ring-purple-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Image
                  src={getImageUrl(mom, "happy")}
                  alt={mom.name || `Mom ${i + 1}`}
                  width={48}
                  height={48}
                  className="object-contain mb-2"
                  style={{ imageRendering: "pixelated" }}
                />
                <span className="text-xs font-medium">
                  {mom.name || `Mom ${i + 1}`}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col items-center">
        <Button
          variant={"primary"}
          className="px-8"
          disabled={loading || moms.length === 0}
          onClick={async () => {
            if (loading) return;
            if (!session) {
              showModal("sign up", redirectLink);
            } else {
              window.location.href = redirectLink;
            }
          }}
        >
          Get {BRAND_NAME}
          {moms[momIndex]?.price
            ? ` - $${(moms[momIndex].price / 100).toFixed(2)}`
            : "!"}
        </Button>
        <div className="h-5 flex items-center justify-center">
          {moms.length > 0 &&
          moms[momIndex] &&
          typeof moms[momIndex].price === "number" &&
          moms[momIndex].price > 0 ? (
            <p className="text-xs text-gray-500 mt-1">One time purchase!</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              No credit card required!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
