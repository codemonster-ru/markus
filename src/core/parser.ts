export const parse = (tokens: Token[]): NodeType => {
    const root: NodeType = { type: 'document', children: [] };
    let i = 0;

    while (i < tokens.length) {
        const t = tokens[i];

        if (t.type === 'heading') {
            const node: HeadingNode = {
                type: 'heading',
                level: t.level,
                children: [{ type: 'text', value: t.content } as TextNode],
            };

            root.children!.push(node);

            i++;

            continue;
        }

        if (t.type === 'list_item') {
            const list: ListNode = { type: 'list', ordered: false, children: [] };

            while (i < tokens.length && tokens[i].type === 'list_item') {
                const itemToken = tokens[i];
                const item: ListItemNode = {
                    type: 'list_item',
                    children: [{ type: 'text', value: itemToken.content } as TextNode],
                };

                list.children.push(item);

                i++;
            }

            root.children!.push(list);

            continue;
        }

        if (t.type === 'text_line') {
            const paraLines: string[] = [];

            while (i < tokens.length && tokens[i].type === 'text_line') {
                paraLines.push(tokens[i].content);

                i++;
            }

            const para: ParagraphNode = {
                type: 'paragraph',
                children: [{ type: 'text', value: paraLines.join(' ') } as TextNode],
            };

            root.children!.push(para);

            continue;
        }

        i++;
    }

    return root;
};
