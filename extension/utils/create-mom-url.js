/**
 * Creates a URL for mom images with the correct expression (happy/sad)
 * @param {string} assetUrl - The base asset URL without expression
 * @param {'happy' | 'sad'} expression - Either 'happy' or 'sad'
 * @returns {string} The full URL to the mom image
 */
export function createMomUrl(assetUrl, expression) {
  if (!assetUrl) {
    // Default to brunette mom if no asset URL is provided
    return `https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-brunette-${expression}.png`;
  }

  // Remove trailing slash if present
  const baseUrl = assetUrl.trim().endsWith("/")
    ? assetUrl.trim().slice(0, -1)
    : assetUrl.trim();

  // Simply append the expression and .png extension
  return `${baseUrl}-${expression}.png`;
}
