// Function to decode JWT token
export function decodeJWT(token: any) {
  console.log("decodeJWT called", { token });
  try {
    // JWT token consists of three parts separated by dots
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT token format");
    }

    // The payload is the second part (index 1)
    const payload = parts[1];

    // Base64Url decode and parse as JSON
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    console.log("decodeJWT finished");
    return decoded;
  } catch (error) {
    console.error("decodeJWT error:", error);
    return null;
  }
}