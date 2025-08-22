/**
 * Creates a URL for mom images with the correct expression (happy/sad)
 * @param {string} assetUrl - The base asset URL without expression
 * @param {'happy' | 'sad'} expression - Either 'happy' or 'sad'
 * @returns {string} The full URL to the mom image
 */
export function createMomUrl(assetUrl:string, expression: 'happy' | 'sad') {
  // Remove trailing slash if present
  let baseUrl = assetUrl.trim().endsWith("/")
    ? assetUrl.trim().slice(0, -1)
    : assetUrl.trim();

  // Remove .png extension if present
  if (baseUrl.toLowerCase().endsWith(".png")) {
    baseUrl = baseUrl.slice(0, -4);
  }

  // Append the expression and .png extension
  return `${baseUrl}-${expression}.png`;
}