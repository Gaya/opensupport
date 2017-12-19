import Koa from 'koa';
import Router from 'koa-router';

import scan from './scan';

const app = new Koa();

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Send POST request with package.json file in `packageJson` field to /scan';
});

app.use(router.routes()).use(router.allowedMethods());
app.use(scan.routes()).use(scan.allowedMethods());

app.listen(process.env.PORT || 1337);
console.log(`Listening to ${process.env.PORT || 1337}`);
