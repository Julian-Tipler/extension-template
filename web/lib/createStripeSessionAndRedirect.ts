export const createStripeSessionAndRedirect = async (productId: string) => {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create Stripe session");
    }
    if (data.isFreeProduct) {
      // Redirect to settings page for free products
      window.location.href =
        "/protected/settings/account?message=You own this free Mom";
      return;
    }

    if (data.alreadyOwnsProduct) {
      // Handle case where user already owns the product
      window.location.href =
        "/protected/settings/account?message=You already own this Mom";
      return;
    }

    if (data.alreadyOwnsAllMoms) {
      // Handle case where user already owns all moms
      window.location.href =
        "/protected/settings/account?message=You already own all Moms! Congratulations! More moms are in development...";
      return;
    }

    if (data?.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("No URL found in Stripe session response.");
    }
  } catch (error) {
    console.error("Error creating Stripe session:", error);
  }
};
