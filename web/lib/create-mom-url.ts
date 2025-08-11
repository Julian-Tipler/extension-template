/**
 * Creates a mood-specific URL for mom assets
 * Takes an asset URL and appends a mood parameter before the file extension
 *
 * @param assetUrl - Original asset URL (e.g., https://...mom-sprites/mom-brunette.png)
 * @param mood - Mood to append (default: "happy")
 * @returns Modified URL with mood (e.g., https://...mom-sprites/mom-brunette-happy.png)
 */
export function createMomUrl(assetUrl: string, mood: string = "happy"): string {
  if (!assetUrl) {
    return assetUrl;
  }

  // Handle case where URL already has a mood specified
  const hasMood = /-happy|-sad|-angry|-surprised|-confused/.test(assetUrl);
  if (hasMood) {
    // Replace existing mood with new mood
    return assetUrl.replace(
      /-happy|-sad|-angry|-surprised|-confused/,
      `-${mood}`
    );
  }

  // Find where the file extension starts (.png, .jpg, etc.)
  const extensionMatch = assetUrl.match(/\.[^.]+$/);

  if (!extensionMatch) {
    // No file extension found, just append the mood at the end
    return `${assetUrl}-${mood}`;
  }

  const extension = extensionMatch[0];
  const baseUrl = assetUrl.substring(0, assetUrl.length - extension.length);

  // Create new URL with mood appended
  return `${baseUrl}-${mood}${extension}`;
}

/**
 * Example usage:
 *
 * const baseUrl = "https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-brunette.png";
 *
 * // Creates: https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-brunette-happy.png
 * const happyMomUrl = createMomUrl(baseUrl);
 *
 * // Creates: https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-brunette-sad.png
 * const sadMomUrl = createMomUrl(baseUrl, "sad");
 */
