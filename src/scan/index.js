import Router from 'koa-router';
import multer from 'koa-multer';
import fs from 'fs';

import { maintainersCountOfProject } from './maintainers';

const upload = multer({ dest: 'tmp/' });

function jsonToDependencies(info) {
  return Array.from(new Set([
    ...Object.keys(info.dependencies),
    ...Object.keys(info.devDependencies),
  ]));
}

function readUpload(path) {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) {
        throw new Error(err);
      }

      fs.unlink(path, () => {});

      resolve(data.toString());
    });
  });
}

const router = new Router();

router.post('/scan', upload.single('package'), async (ctx) => {
  if (!ctx.req.file) {
    ctx.throw(400, 'No package file provided.');
  }

  try {
    const data = await readUpload(ctx.req.file.path);

    const packageJson = JSON.parse(data.toString());
    const dependencies = jsonToDependencies(packageJson);

    const maintainers = await maintainersCountOfProject(dependencies);
    ctx.body = maintainers;
  } catch (e) {
    ctx.throw(500, e.message);
  }
});

export default router;
