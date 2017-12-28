import { sortByCount } from './helpers';

function sumProjects(totals, lib) {
  let totalsCopy = [...totals];

  if (totals.find(item => item.name === lib.name)) {
    totalsCopy = totalsCopy.map((item) => {
      if (item.name === lib.name) {
        return {
          ...item,
          count: item.count + 1,
        };
      }

      return item;
    });
  } else {
    totalsCopy = [...totalsCopy, {
      name: lib.name,
      count: 1,
      maintainers: (lib.maintainers || []).map(maintainer => maintainer.name),
    }];
  }

  if (lib.children) {
    return lib.children.reduce((childTotals, child) => sumProjects(childTotals, child), totalsCopy);
  }

  return totalsCopy;
}

export function packageCountOfProject(info) {
  const libs = info.reduce(sumProjects, []);

  const libsSorted = [...libs].sort(sortByCount);

  return libsSorted.filter((item, index) => index < 20);
}
