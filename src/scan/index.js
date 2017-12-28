// @flow

import fs from 'fs';
import Router from 'koa-router';
import multer from 'koa-multer';
import json from 'koa-json';

import { maintainersCountOfProject } from './maintainers';
import { jsonToDependencies, projectInfo } from './helpers';
import { packageCountOfProject } from './packages';

const upload = multer({ dest: 'tmp/' });

function readUpload(path: string): Promise<string> {
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

const router = new Router({
  prefix: '/scan',
});

async function parsePackageJson(packageJson) {
  const dependencies = jsonToDependencies(packageJson);
  const info = await projectInfo(dependencies);

  return {
    name: packageJson.name,
    maintainers: maintainersCountOfProject(info),
    packages: packageCountOfProject(info),
  };
}

router.post('/upload', upload.single('package'), async (ctx) => {
  if (!ctx.req.file) {
    ctx.throw(400, 'No package file provided.');
  }

  try {
    const data = await readUpload(ctx.req.file.path);
    const packageJson = JSON.parse(data.toString());

    ctx.body = await parsePackageJson(packageJson);
  } catch (e) {
    ctx.throw(500, e.message);
  }
});

router.post('/json', async (ctx) => {
  if (!ctx.request.body) {
    ctx.throw(400, 'Send your package.json contents as the body');
  }

  try {
    ctx.body = await parsePackageJson(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e.message);
  }
});

router.use(json({ pretty: false }));

export default router;
