export function toPersianTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("fa-IR");
  }