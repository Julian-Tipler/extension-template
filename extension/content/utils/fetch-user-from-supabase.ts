import { getSupabaseClient } from "../../utils/get-supabase-client";
import { decodeJWT } from "./decode-jwt";

// Function to fetch user data from Supabase using the auth token
export async function fetchUserFromSupabase(authToken: any) {
  console.log("fetchUserFromSupabase called", { authToken });
  if (!authToken) {
    console.error("fetchUserFromSupabase error: No auth token available");
    return null;
  }

  try {
    // Decode the JWT to get the user ID
    const decodedToken = decodeJWT(authToken);
    if (!decodedToken) {
      console.error("fetchUserFromSupabase error: Failed to decode token");
      return null;
    }

    const userId = decodedToken?.sub; // 'sub' is the standard claim for the subject (user ID)

    if (!userId) {
      console.error(
        "fetchUserFromSupabase error: Could not extract user ID from token"
      );
      return null;
    }

    const supabase = await getSupabaseClient();
    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error(
        "fetchUserFromSupabase error: Error fetching user data:",
        userError
      );
      return null;
    }

    // If user has a selectedProduct, fetch the product details
    let productData = null;
    if (userData?.selectedProduct) {
      const { data: prod, error: prodError } = await supabase
        .from("products")
        .select("*")
        .eq("id", userData.selectedProduct)
        .single();
      if (!prodError) {
        productData = prod;
      }
    }

    // Cache the user data in local storage for future use
    chrome.storage.local.set({ userProfile: userData });

    console.log("fetchUserFromSupabase finished");
    return { userData, productData };
  } catch (error) {
    console.error("fetchUserFromSupabase error:", error);
    return null;
  }
}