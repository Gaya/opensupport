import { sortByCount } from './helpers';

function sumProjects(totals, lib) {
  const totalsCopy = { ...totals };
  totalsCopy[lib.name] = (totalsCopy[lib.name] || 0) + 1;

  if (lib.children) {
    return lib.children.reduce((childTotals, child) => sumProjects(childTotals, child), totalsCopy);
  }

  return totalsCopy;
}

export function packageCountOfProject(info) {
  const libs = info.reduce(sumProjects, {});

  const libsSorted =
    [...Object.keys(libs).map(key => ({ name: key, count: libs[key] }))]
      .sort(sortByCount);

  return libsSorted.filter((item, index) => index < 20);
}
