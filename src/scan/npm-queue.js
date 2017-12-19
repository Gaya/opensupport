import fs from 'fs';
import async from 'async';
import request from 'request';
import npa from 'npm-package-arg';

const filesDir = `${__dirname}/../../files`;

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

    fs.writeFile(`${filesDir}/${encodeURIComponent(name)}.json`, body, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info(`Wrote ${name}.json`);
      }

      const info = JSON.parse(body);

      callback(null, info);
    });
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

export function packageInfo(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${filesDir}/${encodeURIComponent(name)}.json`, (err, data) => {
      if (err && err.errno === -2) {
        return resolve(readFromNpm(name));
      }

      try {
        return resolve(JSON.parse(data.toString()));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  });
}
