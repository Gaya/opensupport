import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

const readQueue = {};
const rootUrl = 'https://www.npmjs.com/package';

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
    request(`${rootUrl}/${name}`, (error, response, body) => {
      if (error) {
        // reject the whole queue
        readQueue[name].map(f => f.reject(error));

        // reject self
        reject(error);
      }

      const $ = cheerio.load(body);
      const maintainers = Array.from($('.collaborators a img')
        .map((i, element) => $(element).attr('alt')));
      const dependencies = Array.from($('h3:contains("Dependencies")').next().find('a')
        .map((i, element) => $(element).text()))
        .reduce((combined, item) => ({
          ...combined,
          [item]: '',
        }), {});

      const info = {
        name,
        maintainers,
        dependencies,
      };

      const file = JSON.stringify(info);

      fs.writeFile(`${__dirname}/files/${encodeURIComponent(name)}.json`, file, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.info(`Wrote ${name}.json`);
        }

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
