import Koa from 'koa';
import Router from 'koa-router';
import multer from 'koa-multer';
import fs from 'fs';

import { maintainersCountOfProject } from './maintainers';

const app = new Koa();
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

router.post('/scan', upload.single('packageJson'), async (ctx) => {
  ctx.body = JSON.stringify(ctx.req.file.path);
  return;

  try {
    const data = await readUpload(ctx.req.file.path);

    const packageJson = JSON.parse(data.toString());
    const dependencies = jsonToDependencies(packageJson);

    const maintainers = await maintainersCountOfProject(dependencies);
    ctx.body = JSON.stringify(maintainers);
  } catch (e) {
    ctx.throw(500, e.message);
  }
});

router.get('/', (ctx) => {
  ctx.body = 'Send POST request with package.json file in `packageJson` field to /scan';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 1337);
console.log(`Listening to ${process.env.PORT || 1337}`);
