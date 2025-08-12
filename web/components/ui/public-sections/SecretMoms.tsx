"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useModal } from "@/app/context/ModalContext";
import { Button } from "../Button";
import { createMomUrl } from "@/lib/create-mom-url";
import { useAuth } from "@/app/context/AuthProvider";

type SecretMom = {
  id: string;
  name: string;
  assetUrl: string;
};

export default function SecretMoms() {
  const [secretMoms, setSecretMoms] = useState<SecretMom[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const { showModal } = useModal();

  useEffect(() => {
    const fetchSecretMoms = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("id, assetUrl, name")
          .eq("secret", true)
          .eq("name", "Joker Mom") // For now, just fetch Joker Mom as specified
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setSecretMoms(data);
        }
      } catch (err) {
        console.error("Error fetching secret moms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSecretMoms();
  }, []);
  const redirectLink = `/protected/checkout-start?productId=${process.env.NEXT_PUBLIC_RANDOM_MOM_ID}`;
  const handleSecretMomClick = async () => {
    if (loading) return;
    if (!session) {
      showModal("sign up", redirectLink);
    } else {
      window.location.href = redirectLink;
    }
  };

  if (loading || secretMoms.length === 0) {
    return null; // Don't show anything if loading or no secret moms
  }
  // Use createMomUrl to generate the correct URL
  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          Secret Moms Await!
        </h2>
        <p className="text-gray-600">
          Discover exclusive moms only available through the Secret Mom option!
        </p>
      </div>

      <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-lg border border-purple-200">
        {/* Mystery container with blurred content */}
        <div className="flex justify-center relative">
          {/* Partially blurred mom image - adjusted visibility */}
          <div className="relative w-32 h-32 filter blur-[6px] animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={createMomUrl(secretMoms[0].assetUrl, "happy")}
                alt="Secret Mom"
                width={128}
                height={128}
                className="object-contain opacity-75"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>

          {/* Question mark overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl text-purple-700 font-bold opacity-80">
              ?
            </span>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-75">
            ✨
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            Unlock the Mystery!
          </h3>
          <p className="text-gray-700 mb-4">
            Try your luck with the Secret Mom option for a chance to get rare
            secret Moms!
          </p>

          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={handleSecretMomClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transform transition-all hover:scale-105"
            >
              Buy Secret Mom (2.99 USD)
            </Button>
          </div>

          <p className="mt-3 text-xs text-purple-600 font-medium">
            Exclusive content • Limited availability • Surprise yourself!
          </p>
        </div>
      </div>
    </div>
  );
}
