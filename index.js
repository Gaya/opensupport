import { maintainersCountOfProject } from './maintainers';

import packageJson from './example-package';

const dependencies = Array.from(new Set([
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.dependencies),
]));

maintainersCountOfProject(dependencies)
  .then(maintainers => {
    console.log(maintainers);
  });
