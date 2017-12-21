import async from 'async';
import request from 'request';
import npa from 'npm-package-arg';

import Package from '../models/Package';

const resolveQueue = {};

function createUri(parsed) {
  const base = 'https://registry.npmjs.org';

  if (parsed.scope) {
    return `${base}/${parsed.escapedName}`;
  }

  return `${base}/${parsed.escapedName}/${parsed.fetchSpec}`;
}

const npmQueue = async.queue(({ name }, callback) => {
  const parsed = npa(name);
  const uri = createUri(parsed);

  request(uri, (error, response, body) => {
    if (error) {
      // reject self
      callback(error, null);
    }

    const data = JSON.parse(body);

    Package
      .create({
        name,
        data,
      })
      .then(() => callback(null, data))
      .catch(e => console.error(e));
  });
}, parseInt(process.env.QUEUE_LIMIT || 10, 10));

function addToResolveQueue(name) {
  return new Promise((resolve, reject) => {
    resolveQueue[name].push({
      resolve,
      reject,
    });
  });
}

function readFromNpm(name) {
  if (resolveQueue[name]) {
    return addToResolveQueue(name);
  }

  // create a read queue
  resolveQueue[name] = [];

  return new Promise((resolve, reject) => {
    npmQueue.push({ name }, (err, info) => {
      if (err) {
        // reject the whole queue
        resolveQueue[name].map(f => f.reject(err));

        reject(err);
      }

      // resolve the whole queue
      resolveQueue[name].map(f => f.resolve(info));

      // clear queue
      delete resolveQueue[name];

      // resolve self
      resolve(info);
    });
  });
}

export async function packageInfo(name) {
  const packagejson = await Package.findOne({ where: { name } });

  if (!packagejson) {
    return readFromNpm(name);
  }

  return packagejson.data;
}
