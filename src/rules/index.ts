import { default as emphasis } from './emphasis';
import { default as headings } from './headings';
import { default as lineBreak } from './lineBreak';
import { default as paragraph } from './paragraph';

export default { ...emphasis, ...headings, ...lineBreak, ...paragraph } satisfies RulesType;
