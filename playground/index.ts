import { Markus } from '../src';
import { readFileSync } from 'fs';

const markus = new Markus();
const cheatsheet = readFileSync('./playground/cheatsheet.md', 'utf-8');

console.log(markus.getHtml(cheatsheet));
