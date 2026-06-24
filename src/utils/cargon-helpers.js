export function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateText(value = "", max = 140) {
  const text = stripHtml(value);
  if (text.length <= max) return text;
  return `${text.substring(0, max)}...`;
}

const serviceIcons = [
  "/cargon/img/icon/ca-ser-2.1.svg",
  "/cargon/img/icon/ca-ser-2.2.svg",
  "/cargon/img/icon/ca-ser-2.3.svg",
];

export function getServiceIcon(index) {
  return serviceIcons[index % serviceIcons.length];
}
