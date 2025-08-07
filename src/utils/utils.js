export function toPersianTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("fa-IR");
}

export const formatText = (text) =>
  text ? text.substring(0, 20) + "..." : "______";


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