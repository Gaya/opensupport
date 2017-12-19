export function jsonToDependencies(info) {
  return Array.from(new Set([
    ...Object.keys(info.dependencies || {}),
    ...Object.keys(info.devDependencies || {}),
  ]));
}
