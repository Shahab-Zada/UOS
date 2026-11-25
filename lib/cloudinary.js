export function normalizeCloudinaryImage(data = {}) {
  const normalized = { ...data };
  const hasImageField =
    Object.prototype.hasOwnProperty.call(data, "imageUrl") ||
    Object.prototype.hasOwnProperty.call(data, "image");

  if (hasImageField) {
    const url = data.imageUrl || data.image || "";
    normalized.imageUrl = url;
    normalized.image = url;
    if (
      !url &&
      !Object.prototype.hasOwnProperty.call(data, "cloudinaryPublicId")
    ) {
      normalized.cloudinaryPublicId = "";
    }
  }

  return normalized;
}
