import * as fs from 'fs';
import * as csv from 'fast-csv';
import chineseConv from 'chinese-conv';

const original = fs.readFileSync('public/etmadata.json');
const object = {
  data: [],
};

const raw = JSON.parse(original) || { data: [] };

const map = new Map();
let count = 0;

function genMachineId() {
  count++;
  return count;
}

function findId([name, attribute, system]) {
  return genMachineId();
  const t = raw.data.find((d) => d.name === name);
  return t ? t.id : genMachineId();
}

fs.createReadStream('etma.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    const tName = chineseConv.tify(row[0]);
    object.data.push({
      id: findId(row),
      name: tName,
      attribute: row[1],
      system: row[2],
      tag: row[3],
      initialEnergy: row[4],
      summonEnergy: row[5],
      mainDescription: row[6],
      nick: row[7],
    });
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    const json = JSON.stringify(object);
    fs.writeFile('public/etmadata.json', json, 'utf8', () => {});
  });
