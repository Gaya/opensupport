import { packageInfo } from './npm-queue';
import { jsonToDependencies } from './helpers';
import gravatar from 'gravatar';

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

function totalMaintainersFromLibs(libs, current = []) {
  return libs.map(lib => lib.maintainers)
    .reduce((totals, maintainers = []) => {
      const updated = totals
        .map(maintainer => {
          if (maintainers.find(item => item.name === maintainer.name)) {
            return {
              ...maintainer,
              count: maintainer.count + 1,
            };
          }

          return maintainer;
        });

      const newItems = maintainers
        .filter(maintainer => !totals.find(item => item.name === maintainer.name))
        .map(maintainer => ({
          name: maintainer.name,
          avatar: gravatar.url(maintainer.email),
          count: 1,
        }));

      return [
        ...updated,
        ...newItems,
      ];
    }, current);
}

export async function maintainersCountOfProject(dependencies) {
  const info = await Promise.all(dependencies.map(dependency => recursivePackageInfo(dependency)));

  const maintainerCount = info
    .reduce((totals, lib) => {
      const maintainers = totalMaintainersFromLibs([lib], totals);

      if (lib.children) {
        return totalMaintainersFromLibs(lib.children, maintainers);
      }

      return maintainers;
    }, []);

  const sortedMaintainerCount = [...maintainerCount].sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }

    if (a.count < b.count) {
      return 1;
    }

    return 0;
  });

  return sortedMaintainerCount.filter((item, index) => index < 20);
}
