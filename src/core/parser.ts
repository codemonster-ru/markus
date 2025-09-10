import { tokenizeInline } from './tokenizer';

export const parse = (tokens: Token[]): NodeType => {
    const root: NodeType = { type: 'document', children: [] };
    let i = 0;

    while (i < tokens.length) {
        const t = tokens[i];

        if (t.type === 'heading') {
            const node: HeadingNode = {
                type: 'heading',
                level: t.level,
                children: [{ type: 'text', value: t.value } as TextNode],
            };

            root.children!.push(node);

            i++;

            continue;
        }

        if (t.type === 'unordered_list_item' || t.type === 'ordered_list_item') {
            const list: ListNode = {
                type: 'list',
                ordered: t.type === 'ordered_list_item',
                children: [],
            };

            const listType = t.type; // фиксируем тип списка (ul/ol)

            while (i < tokens.length && tokens[i].type === listType) {
                const itemToken = tokens[i];

                const item: ListItemNode = {
                    type: 'list_item',
                    children: [
                        {
                            type: 'text',
                            value: itemToken.value,
                        } as TextNode,
                    ],
                };

                // Проверяем вложенные списки (по indent)
                let j = i + 1;
                while (
                    j < tokens.length &&
                    (tokens[j].type === 'unordered_list_item' || tokens[j].type === 'ordered_list_item') &&
                    tokens[j].indent > itemToken.indent
                ) {
                    const subTokens: Token[] = [];
                    const baseIndent = tokens[j].indent;

                    // собираем все токены подсписка с большим отступом
                    while (
                        j < tokens.length &&
                        (tokens[j].type === 'unordered_list_item' || tokens[j].type === 'ordered_list_item') &&
                        tokens[j].indent >= baseIndent
                    ) {
                        subTokens.push(tokens[j]);
                        j++;
                    }

                    const subParserResult = parse(subTokens);
                    if (subParserResult.children?.length) {
                        item.children.push(...subParserResult.children);
                    }
                }

                list.children.push(item);
                i = j;
            }

            root.children!.push(list);
            continue;
        }

        if (t.type === 'blockquote') {
            const node: BlockquoteNode = {
                type: 'blockquote',
                children: parse(t.children || []).children || [],
            };

            root.children!.push(node);
            i++;
            continue;
        }

        if (t.type === 'text_line') {
            const children: NodeType[] = [];

            while (i < tokens.length && (tokens[i].type === 'text_line' || tokens[i].type === 'linebreak')) {
                const tok = tokens[i];

                if (tok.type === 'text_line') {
                    children.push(...tokenizeInline(tok.value));

                    // если следующая строка тоже text_line → это мягкий перенос (softbreak)
                    if (i + 1 < tokens.length && tokens[i + 1].type === 'text_line') {
                        children.push({ type: 'softbreak' });
                    }
                } else if (tok.type === 'linebreak') {
                    children.push({ type: 'linebreak' });
                }

                i++;
            }

            const para: ParagraphNode = {
                type: 'paragraph',
                children,
            };

            root.children!.push(para);

            continue;
        }

        i++;
    }

    return root;
};
