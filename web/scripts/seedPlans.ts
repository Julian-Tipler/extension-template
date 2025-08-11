import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const plans = [
  {
    stripePriceId: "<insert price id here>",
    name: "Silver",
    price: 999,
    description: "Silver plan for getting started.",
    features: [
      { check: true, description: "Customer Support" },
      { check: true, description: "Feature 1" },
      { check: false, description: "Feature 2" },
      { check: false, description: "Feature 3" },
    ],
    color: "#c0c0c0",
  },
  {
    stripePriceId: "<insert price id here>",
    name: "Gold",
    price: 1999,
    description: "Gold plan for professionals.",
    features: [
      { check: true, description: "Customer Support" },
      { check: true, description: "Feature 1" },
      { check: true, description: "Feature 2" },
      { check: false, description: "Feature 3" },
    ],
    color: "#FFD700",
  },
  {
    stripePriceId: "<insert price id here>",
    name: "Platinum",
    price: 2999,
    description: "Platinum plan for organizations.",
    features: [
      { check: true, description: "Customer Support" },
      { check: true, description: "Feature 1" },
      { check: true, description: "Feature 2" },
      { check: true, description: "Feature 3" },
    ],
    color: "#E5E4E2",
  },
];

async function seedPlans() {
  for (const plan of plans) {
    const { error } = await supabase.from("plans").insert({
      stripePriceId: plan.stripePriceId,
      name: plan.name,
      price: plan.price,
      description: plan.description,
      features: plan.features,
      color: plan.color,
    });
    if (error) {
      console.error(`Error inserting plan ${plan.name}:`, error.message);
    } else {
      console.log(`Inserted plan: ${plan.name}`);
    }
  }
}

seedPlans().then(() => {
  console.log("Seeding complete.");
  process.exit(0);
});
