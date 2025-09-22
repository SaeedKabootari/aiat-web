export function toPersianTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("fa-IR");
}

export const formatText = (text) =>
  text ? text.substring(0, 20) + "..." : "______";

export const formatComment = (text) => text.substring(0, 20) + "...";

export const transformKeys = (data) => {
  return data.map((item) => {
    // Transform the main keys
    const transformedItem = {
      id: item.ID,
      label: item.CAPTION,
      // Recursively transform children if they exist
      children: item.children ? transformKeys(item.children) : [],
    };

    // Preserve other properties
    Object.keys(item).forEach((key) => {
      if (key !== "ID" && key !== "CAPTION" && key !== "children") {
        transformedItem[key] = item[key];
      }
    });

    return transformedItem;
  });
};

export const cleanMessageText = (text) => {
  if (!text) return "";

  // Create a temporary element for HTML entity decoding
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  let cleaned = textarea.value;

  // Replace common HTML tags with appropriate formatting
  cleaned = cleaned
    .replace(/<br\s*\/?>/gi, "\n") // Convert <br> to newlines
    .replace(/<\/?[a-z][^>]*>/gi, "") // Remove all other HTML tags
    .replace(/(\n){3,}/g, "\n\n") // Normalize multiple newlines
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with regular spaces
    .trim();

  return cleaned;
};
