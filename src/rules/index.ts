import { default as headings } from './headings';
import { default as lineBreak } from './lineBreak';
import { default as paragraph } from './paragraph';

export default { ...headings, ...lineBreak, ...paragraph } satisfies RulesType;
