import * as fs from 'fs';
import * as csv from 'fast-csv';

const original = fs.readFileSync('public/etdata.json');
const object = {
  data: [],
};

const raw = JSON.parse(original) || { data: [] };

function toDecimal(percent) {
  return parseFloat(percent) / 100;
}

function findId(name) {
  const t = raw.data.find((d) => d.name === name);
  return t ? t.id : '';
}

let count = 0;

fs.createReadStream('et.csv')
  .pipe(csv.parse({ headers: false }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    count += 1;
    if (count === 1) {
      row.forEach((k, i) => {
        console.log(k, i);
      });
      return;
    }
    if (row[0] === '/') {
      return;
    }
    object.data.push({
      id: findId(row[1]),
      name: row[1],
      attribute: row[0],
      attack: row[42],
      hp: row[43],
      series: row[44] || '',
      data: {
        titan: {
          attack: toDecimal(row[3]) || 0,
          hp: toDecimal(row[4]) || 0,
          cri: toDecimal(row[5]) || 0,
          crid: toDecimal(row[6]) || 0,
          da: toDecimal(row[7]) || 0,
          ta: toDecimal(row[8]) || 0,
          backwater: toDecimal(row[9]) || 0,
          calm: toDecimal(row[10]) || 0,
          burstd: toDecimal(row[11]) || 0,
          burstdl: toDecimal(row[12]) || 0,
          skilld: toDecimal(row[13]) || 0,
          skilldl: toDecimal(row[14]) || 0,
        },
        greece: {
          attack: toDecimal(row[16]) || 0,
          hp: toDecimal(row[17]) || 0,
          cri: toDecimal(row[18]) || 0,
          crid: toDecimal(row[19]) || 0,
          da: toDecimal(row[20]) || 0,
          ta: toDecimal(row[21]) || 0,
          backwater: toDecimal(row[22]) || 0,
          calm: toDecimal(row[23]) || 0,
          burstd: toDecimal(row[24]) || 0,
          burstdl: toDecimal(row[25]) || 0,
          skilld: toDecimal(row[26]) || 0,
          skilldl: toDecimal(row[27]) || 0,
        },
        star: {
          attack: toDecimal(row[29]) || 0,
          hp: toDecimal(row[30]) || 0,
          cri: toDecimal(row[31]) || 0,
          crid: toDecimal(row[32]) || 0,
          da: toDecimal(row[33]) || 0,
          ta: toDecimal(row[34]) || 0,
          backwater: toDecimal(row[35]) || 0,
          calm: toDecimal(row[36]) || 0,
          burstd: toDecimal(row[37]) || 0,
          burstdl: toDecimal(row[38]) || 0,
          skilld: toDecimal(row[39]) || 0,
          skilldl: toDecimal(row[40]) || 0,
        },
      },
    });
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    const json = JSON.stringify(object);
    fs.writeFile('public/etdata.json', json, 'utf8', () => {});
  });
