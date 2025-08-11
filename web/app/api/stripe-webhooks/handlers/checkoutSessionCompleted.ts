import { supabaseAdmin } from "@/lib/supabase/admin";

// Define types for product data
interface Product {
  id: string;
  randomChance?: number;
  [key: string]: any; // Allow other properties
}

interface PurchaseWithProduct {
  productId: string;
  product: Product;
  [key: string]: any; // Allow other properties
}

/**
 * Selects a random mom based on product randomChance values, excluding products the user already owns
 * @param userId - The ID of the user making the purchase
 * @returns The randomly selected product or null if selection fails
 */
async function selectRandomMom(userId: string): Promise<Product | null> {
  try {
    // 1. Get the products the user already owns
    const { data: userPurchases, error: purchasesError } = await supabaseAdmin
      .from("purchases")
      .select("productId")
      .eq("userId", userId)
      .eq("status", "active");

    if (purchasesError) {
      console.error("Error fetching user purchases:", purchasesError);
      return null;
    }

    const ownedProductIds = new Set(
      (userPurchases || []).map((p) => p.productId)
    );
    console.log(`User ${userId} already owns ${ownedProductIds.size} products`);

    // 2. Fetch all products with randomChance field, excluding owned products
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, randomChance")
      .not("randomChance", "is", null)
      .gt("randomChance", 0);

    if (productsError || !products || products.length === 0) {
      console.error(
        "Error fetching products with randomChance:",
        productsError
      );
      return null;
    }

    // Filter out products the user already owns
    const productsWithChance: Product[] = products.filter(
      (p) => !ownedProductIds.has(p.id)
    );

    if (productsWithChance.length === 0) {
      console.log(
        `User ${userId} already owns all available random mom products`
      );
      return null;
    }

    console.log(
      `Found ${productsWithChance.length} available products for random selection`
    );

    // 2. Calculate total randomChance sum and prepare weighted selection
    const totalChance = productsWithChance.reduce(
      (sum, product) => sum + (product.randomChance || 0),
      0
    );
    let randomValue = Math.random() * totalChance;
    let selectedProduct = productsWithChance[0]; // Default to first product if something goes wrong

    // 3. Select a product based on weighted probability
    for (const product of productsWithChance) {
      randomValue -= product.randomChance || 0;
      if (randomValue <= 0) {
        selectedProduct = product;
        break;
      }
    }

    return selectedProduct;
  } catch (error) {
    console.error("Error in selectRandomMom:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkoutSessionCompleted = async (data: any) => {
  let purchaseId = null;

  try {
    console.log(data?.object);
    const userId = data?.object?.metadata.user_id;
    if (!userId) {
      throw new Error("No user ID found in session data");
    }
    console.info("checkoutSessionCompleted for user:", userId);

    // Fetch user from public.users
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user", userError);
      throw new Error("Error fetching user");
    }

    // Fetch product from public.products
    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("stripePriceId", data.object.metadata.stripePriceId)
      .single();

    if (productError) {
      console.error("Error fetching product", productError);
      throw new Error("Error fetching product");
    }

    // Check if this is the random mom product
    const isRandomMomProduct =
      product.stripePriceId ===
      process.env.NEXT_PUBLIC_RANDOM_MOM_STRIPE_PRICE_ID;

    let actualProductId = product.id;

    // If this is the random mom product, select a random mom first
    if (isRandomMomProduct) {
      const selectedRandomMom = await selectRandomMom(userId);
      if (selectedRandomMom) {
        actualProductId = selectedRandomMom.id;
        console.log(
          `Random mom selected for user ${userId}: ${actualProductId}`
        );
      } else {
        console.log(
          `Failed to select random mom for user ${userId}, using original product`
        );
      }
    }

    // Create a new purchase record with either the original product or the randomly selected one
    const { data: newPurchase, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        userId: user.id, // link purchase to this user
        productId: actualProductId, // This could be the random mom product
        stripePurchaseId: data.object.id,
        status: "active", // Set status to active
      })
      .select("id")
      .single();

    purchaseId = newPurchase?.id;

    if (purchaseError) {
      console.error("Issue creating purchase", purchaseError);
      throw new Error("Issue creating purchase");
    }
    console.log("New Purchase", newPurchase);

    // Set the selected product as the user's active mom
    if (isRandomMomProduct) {
      const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ selectedProduct: actualProductId })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating user's selected product:", updateError);
      } else {
        console.log(
          `User ${userId}'s selected product updated to: ${actualProductId}`
        );
      }
    }

    // TODO: Send thank-you email to the user here
    // Example:
    // await sendThankYouEmail(user.email, product.name);

    return { received: true };
  } catch (error) {
    if (purchaseId) {
      await supabaseAdmin.from("purchases").delete().eq("id", purchaseId);
    }
    console.error("error:", error);
    throw error;
  }
};

// const returnEmail = (customerName: string, session: { id: string }) => {
//   return `
//     <h1>Thank you for your order, ${customerName}!</h1>
//     <p>Your payment was successful. We'll process your order shortly.</p>
//     <p>Order ID: ${session.id}</p>
//   `;
// };
