import { default as headings } from './headings';
import { default as paragraph } from './paragraph';

export default { ...headings, ...paragraph } satisfies RulesType;
