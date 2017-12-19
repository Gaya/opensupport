import fs from 'fs';
import { exec } from 'child_process';
import async from 'async';

const filesDir = `${__dirname}/../../files`;

const resolveQueue = {};
const npmQueue = async.queue(({ name }, callback) => {
  exec(`npm view ${name} --json`, {}, (error, stdout, stderr) => {
    if (error || stderr) {
      // reject self
      callback(error || stderr, null);
    }

    fs.writeFile(`${filesDir}/${encodeURIComponent(name)}.json`, stdout, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info(`Wrote ${name}.json`);
      }

      const info = JSON.parse(stdout);

      callback(null, info);
    });
  });
}, 10);

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
