import { tokenize } from './core/tokenizer';
import { parse } from './core/parser';
import { render } from './core/renderer';

export function markdownToHtml(input: string): string {
    const tokens = tokenize(input);
    const ast = parse(tokens);

    return render(ast);
}
