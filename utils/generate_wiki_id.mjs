import fs from 'fs';
import short from 'short-uuid';

const decimalTranslator = short("0123456789");

let rawdata = fs.readFileSync('public/etdata.json');
let original = fs.readFileSync('public/data_with_id.json');
let wiki = JSON.parse(rawdata);
let object = JSON.parse(original) || {};

wiki.data.forEach((data) => {
  if (data.id) {
    object[data.id] = data;
    return;
  }
  let k = String(+decimalTranslator.generate().substr(0, 10));
  while (object[k]) {
    k = String(+decimalTranslator.generate().substr(0, 10));
  }
  data.id = k;
  object[k] = data;
});

var json = JSON.stringify(object);
fs.writeFile('public/data_with_id.json', json, 'utf8', () => {});

var json2 = JSON.stringify(wiki);
fs.writeFile('public/etdata.json', json2, 'utf8', () => {});
