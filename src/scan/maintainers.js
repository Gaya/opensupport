import gravatar from 'gravatar';

import { sortByCount } from './helpers';

function totalMaintainersFromLibs(libs, current = []) {
  return libs
    .reduce((totals, { name, maintainers = [] }) => {
      const updated = totals
        .map(maintainer => {
          if (maintainers.find(item => item.name === maintainer.name)) {
            return {
              ...maintainer,
              count: maintainer.count + 1,
              libs: [...maintainer.libs, name],
            };
          }

          return maintainer;
        });

      const newItems = maintainers
        .filter(maintainer => !totals.find(item => item.name === maintainer.name))
        .map(maintainer => ({
          name: maintainer.name,
          avatar: gravatar.url(maintainer.email, {}, 'https'),
          count: 1,
          libs: [name],
        }));

      return [
        ...updated,
        ...newItems,
      ];
    }, current);
}

export function maintainersCountOfProject(info) {
  const maintainerCount = info
    .reduce((totals, lib) => {
      const maintainers = totalMaintainersFromLibs([lib], totals);

      if (lib.children) {
        return totalMaintainersFromLibs(lib.children, maintainers);
      }

      return maintainers;
    }, []);

  const sortedMaintainerCount = [...maintainerCount].sort(sortByCount);

  const limitedMaintainers = sortedMaintainerCount.filter((item, index) => index < 20);

  return limitedMaintainers.map(maintainer => ({
    ...maintainer,
    libs: [...maintainer.libs.reduce((current, lib) => {
      if (current.some(item => item.name === lib)) {
        return current.map(item => {
          if (item.name === lib) {
            return {
              ...item,
              count: item.count + 1,
            };
          }

          return item;
        });
      }

      return [...current, { name: lib, count: 1 }];
    }, [])].sort(sortByCount),
  }));
}
