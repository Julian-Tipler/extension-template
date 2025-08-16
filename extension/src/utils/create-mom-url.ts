/**
 * Creates a URL for mom images with the correct expression (happy/sad)
 * @param assetUrl - The base asset URL without expression
 * @param expression - Either 'happy' or 'sad'
 * @returns The full URL to the mom image
 */
export function createMomUrl(
  assetUrl: string,
  expression: "happy" | "sad"
): string {
  if (!assetUrl) {
    // Default to brunette mom if no asset URL is provided
    return `https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-brunette-${expression}.png`;
  }

  // Get the base asset URL, removing any trailing slashes
  let baseUrl = assetUrl.trim();
  baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  // Extract the file extension if present
  const hasExtension = baseUrl.match(/\.(png|jpg|jpeg|gif|webp)$/i);

  if (hasExtension) {
    // If the URL already has an extension, insert the expression before the extension
    const extension = hasExtension[0];
    const basePath = baseUrl.substring(0, baseUrl.length - extension.length);
    return `https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/${basePath}-${expression}${extension}`;
  } else {
    // If no extension, simply append the expression and .png
    return `https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/${baseUrl}-${expression}.png`;
  }
}
