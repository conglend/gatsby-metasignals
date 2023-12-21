export function getArrayFromSpaceSeparatedString(string: string) {
  return string.split(/(\s+)/).filter((word: string) => word.trim().length > 0) || []
}
