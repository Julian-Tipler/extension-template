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
    if (data?.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("No URL found in Stripe session response.");
    }
  } catch (error) {
    console.error("Error creating Stripe session:", error);
  }
};
