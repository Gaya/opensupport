// @flow

type CountType = {
  count: number,
};

export function sortByCount(a: CountType, b: CountType) {
  if (a.count > b.count) {
    return -1;
  }

  if (a.count < b.count) {
    return 1;
  }

  return 0;
}

type PackageJsonType = {
  devDependencies?: {},
  dependencies?: {},
};

export function jsonToDependencies(info: PackageJsonType) {
  return Array.from(new Set([
    ...Object.keys(info.dependencies || {}),
    ...Object.keys(info.devDependencies || {}),
  ]));
}
