export function toPersianTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("fa-IR");
  }

  export const formatText = (text) => text ? text.substring(0, 20) + '...' : '______';