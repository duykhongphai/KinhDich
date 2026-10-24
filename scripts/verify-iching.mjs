import fs from 'node:fs';
import assert from 'node:assert/strict';
import { HEXAGRAMS } from '../src/data/hexagrams.js';
import { TRIGRAMS } from '../src/data/trigrams.js';
const raw=JSON.parse(fs.readFileSync('src/data/classical.json','utf8'));
assert.equal(raw.hexagrams.length,64);
assert.equal(new Set(HEXAGRAMS.map(h=>h.upper+'_'+h.lower)).size,64);
for(const h of HEXAGRAMS){const c=raw.hexagrams.find(x=>x.number===h.id);assert.ok(c?.guaci&&c?.tuan&&c?.xiang?.length);assert.ok(c.yaoci.length>=6);assert.equal(h.lines.length,6);assert.ok(TRIGRAMS[h.upper]&&TRIGRAMS[h.lower]);}
const source=fs.readFileSync('src/utils/ichingUtils.js','utf8').replace("'../data/trigrams'","'../data/trigrams.js'").replace("'../data/hexagrams'","'../data/hexagrams.js'");
fs.writeFileSync('src/utils/.verify-iching.mjs',source);
try {
 const {getHexagramFromLines,getTransformedHexagram,getNuclearHexagram}=await import('../src/utils/.verify-iching.mjs');
 for(let n=0;n<4096;n++){
  const lines=Array.from({length:6},(_,i)=>6+((n>>(2*i))&3));
  const p=getHexagramFromLines(lines),t=getTransformedHexagram(lines),u=getNuclearHexagram(lines);
  assert.deepEqual(p.binary,lines.map(v=>Number(v===7||v===9)));
  const moving=lines.flatMap((v,i)=>v===6||v===9?[i]:[]);
  assert.deepEqual(t.movingLineIndices,moving);
  assert.deepEqual(u.binary,[p.binary[1],p.binary[2],p.binary[3],p.binary[2],p.binary[3],p.binary[4]]);
  assert.equal(t.hasMovingLines,Boolean(moving.length));
  if(moving.length) assert.deepEqual(t.binary,lines.map(v=>Number(v===6||v===7)));
 }
 console.log('PASS: 64 classical records, 384 base lines, all 4096 casts and derived hexagrams.');
} finally { fs.unlinkSync('src/utils/.verify-iching.mjs'); }
