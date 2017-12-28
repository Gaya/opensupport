// @flow

import Koa from 'koa';
import koaStatic from 'koa-static';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import historyFallback from 'koa2-history-api-fallback';

import scan from './scan';

const app = new Koa();

app.use(historyFallback());
app.use(koaStatic(`${__dirname}/../public`));
app.use(cors());
app.use(bodyParser());

app
  .use(scan.routes())
  .use(scan.allowedMethods());

app.listen(process.env.PORT || 3030);

console.log(`Listening to ${process.env.PORT || 3030}`);
