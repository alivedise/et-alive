import fs from 'fs';
import fetch from 'node-fetch';
import { sify } from 'chinese-conv';

let rawdata1 = fs.readFileSync('public/etdata.json');
let part = JSON.parse(rawdata1);

async function cacheImage(src) {
  const s = `src/images/${src.split('/').reverse()[0]}`;
  if (!fs.existsSync(s)) {
    return fetch(src)
      .then(res =>
        res.body.pipe(
          fs.createWriteStream(s),
        ),
      ).catch((error) => {
        console.error(error);
      });
  } else {
    return Promise.resolve();
  }
}

await part.wiki.forEach((data) => {
  console.log(data.icon);
  return Promise.allSettled([cacheImage(data)]);
});

console.log('done');
