import { markdownToHtml } from '../src';
import { readFileSync } from 'fs';

const cheatsheet = readFileSync('./playground/cheatsheet.md', 'utf-8');

console.log(markdownToHtml(cheatsheet));
