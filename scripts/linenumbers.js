import fs from 'fs';
const path = process.argv[2];
if (!path) { console.error('Usage: node linenumbers.js <file>'); process.exit(1); }
const s = fs.readFileSync(path,'utf8');
s.split(/\r?\n/).forEach((l,i)=>console.log(String(i+1).padStart(4,' ')+': '+l));
