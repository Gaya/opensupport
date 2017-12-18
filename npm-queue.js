import fs from 'fs';
import { exec } from 'child_process';

const readQueue = {};

function addToNpmQueue(name) {
  return new Promise((resolve, reject) => {
    readQueue[name].push({
      resolve,
      reject,
    });
  });
}

function readFromNpm(name) {
  if (readQueue[name]) {
    return addToNpmQueue(name);
  }

  // create a read queue
  readQueue[name] = [];

  return new Promise((resolve, reject) => {
    exec(`npm view ${name} --json`, {}, (error, stdout, stderr) => {
      if (error || stderr) {
        // reject the whole queue
        readQueue[name].map(f => f.reject(error || stderr));

        // reject self
        reject(error || stderr);
      }

      fs.writeFile(`${__dirname}/files/${encodeURIComponent(name)}.json`, stdout, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.info(`Wrote ${name}.json`);
        }

        const info = JSON.parse(stdout);

        // resolve the whole queue
        readQueue[name].map(f => f.resolve(info));

        // clear queue
        delete readQueue[name];

        // resolve self
        resolve(info);
      });
    });
  });
}

export function packageInfo(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/files/${encodeURIComponent(name)}.json`, (err, data) => {
      if (err && err.errno === -2) {
        return resolve(readFromNpm(name));
      }

      try {
        return resolve(JSON.parse(data.toString()));
      } catch (e) {
        console.error(e);
      }
    });
  });
}
