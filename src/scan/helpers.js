import { packageInfo } from './npm-queue';

export function sortByCount(a, b) {
  if (a.count > b.count) {
    return -1;
  }

  if (a.count < b.count) {
    return 1;
  }

  return 0;
}

export function jsonToDependencies(info) {
  return Array.from(new Set([
    ...Object.keys(info.dependencies || {}),
    ...Object.keys(info.devDependencies || {}),
  ]));
}

async function recursivePackageInfo(name, currentLevel = 1, maxLevels = 2) {
  return packageInfo(name).then(async info => {
    if (maxLevels === currentLevel) {
      return info;
    }

    const dependencies = jsonToDependencies(info);

    if (dependencies && dependencies.length > 0) {
      return {
        ...info,
        children: await Promise.all(dependencies.map(dependency => recursivePackageInfo(
          dependency,
          currentLevel + 1,
          maxLevels,
        ))),
      };
    }

    return info;
  });
}

export function projectInfo(dependencies) {
  return Promise.all(dependencies.map(dependency => recursivePackageInfo(dependency)));
}
