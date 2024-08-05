export function cleanUrl(text: string) {
  const urlRegex = /https?:\/\/[^\s"']+/g;
  const links = text.match(urlRegex);
  return links ? links[0] : undefined;
}
