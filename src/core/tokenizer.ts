const isSetextUnderline = (line: string): 1 | 2 | null => {
    if (/^=+$/.test(line.trim())) return 1;
    if (/^-+$/.test(line.trim())) return 2;
    return null;
};

const detectType = (line: string, nextLine: string): string => {
    const underlineLevel = nextLine ? isSetextUnderline(nextLine) : null;

    if (/^#{1,6}\s+/.test(line)) {
        return 'heading';
    } else if (/^\s*[-*+]\s+/.test(line)) {
        return 'unordered_list_item';
    } else if (/^\s*\d+\.\s+/.test(line)) {
        return 'ordered_list_item';
    } else if (/^>\s?/.test(line)) {
        return 'blockquote';
    } else if (underlineLevel) {
        return `setext_heading_${underlineLevel}`;
    } else if (/^\s*$/.test(line)) {
        return 'blank';
    } else {
        return 'paragraph';
    }
};

export const tokenize = (input: string): Token[] => {
    const tokens: Token[] = [];
    const lines = input.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const nextLine = lines[i + 1];
        const type = detectType(line, nextLine);

        switch (type) {
            case 'heading':
                const m = line.match(/^(#{1,6})\s+(.*)$/);

                if (m) {
                    tokens.push({ type: 'heading', level: m[1].length, value: m[2] });
                }

                break;
            case 'setext_heading_1':
            case 'setext_heading_2':
                const level = type === 'setext_heading_1' ? 1 : 2;

                tokens.push({ type: 'heading', level: level, value: line });

                i++, i++;

                break;
            case 'unordered_list_item':
                tokens.push({
                    type: 'unordered_list_item',
                    value: line.replace(/^\s*[-*+]\s+/, ''),
                    indent: line.match(/^\s*/)?.[0].length || 0,
                });

                break;
            case 'ordered_list_item':
                tokens.push({
                    type: 'ordered_list_item',
                    value: line.replace(/^\s*\d+\.\s+/, ''),
                    indent: line.match(/^\s*/)?.[0].length || 0,
                });

                break;
            case 'blockquote':
                const blockquoteLines: string[] = [];

                while (i < lines.length && /^>+/.test(lines[i])) {
                    blockquoteLines.push(lines[i]);
                    i++;
                }

                const parseBlockquote = (lines: string[], level = 1): Token[] => {
                    const tokens: Token[] = [];
                    let buffer: string[] = [];

                    const flushBuffer = () => {
                        if (buffer.length > 0) {
                            tokens.push(...tokenize(buffer.join('\n')));
                            buffer = [];
                        }
                    };

                    for (const line of lines) {
                        const match = line.match(/^(>+)\s?(.*)$/);
                        if (!match) {
                            buffer.push(line);
                            continue;
                        }

                        const currentLevel = match[1].length;
                        const content = match[2] || '';

                        if (currentLevel > level) {
                            flushBuffer();
                            tokens.push({
                                type: 'blockquote',
                                children: parseBlockquote([line.replace(/^>\s?/, '')], currentLevel),
                            });
                        } else if (currentLevel === level) {
                            buffer.push(content);
                        } else {
                            flushBuffer();
                            break;
                        }
                    }

                    flushBuffer();
                    return tokens;
                };

                tokens.push({
                    type: 'blockquote',
                    children: parseBlockquote(blockquoteLines),
                });

                continue;
            case 'blank':
                tokens.push({ type: 'blank' });

                break;
            default:
                // fallback → paragraph line
                if (line.endsWith('  ')) {
                    tokens.push({ type: 'text_line', value: line.trimEnd() });
                    tokens.push({ type: 'linebreak' });
                } else if (line.endsWith('\\')) {
                    tokens.push({ type: 'text_line', value: line.slice(0, -1) });
                    tokens.push({ type: 'linebreak' });
                } else {
                    tokens.push({ type: 'text_line', value: line });
                }

                break;
        }

        i++;
    }

    return tokens;
};

export const tokenizeInline = (text: string): Token[] => {
    const tokens: Token[] = [];
    let i = 0;

    while (i < text.length) {
        // Bold (** or __)
        if (text.startsWith('**', i) || text.startsWith('__', i)) {
            const marker = text.slice(i, i + 2);
            const end = text.indexOf(marker, i + 2);
            if (end !== -1) {
                tokens.push({ type: 'strong_open' });
                tokens.push(...tokenizeInline(text.slice(i + 2, end)));
                tokens.push({ type: 'strong_close' });
                i = end + 2;
                continue;
            }
        }

        // Italic (* or _)
        if (text[i] === '*' || text[i] === '_') {
            const marker = text[i];
            const end = text.indexOf(marker, i + 1);
            if (end !== -1) {
                tokens.push({ type: 'em_open' });
                tokens.push(...tokenizeInline(text.slice(i + 1, end)));
                tokens.push({ type: 'em_close' });
                i = end + 1;
                continue;
            }
        }

        // Strikethrough (~~)
        if (text.startsWith('~~', i)) {
            const end = text.indexOf('~~', i + 2);
            if (end !== -1) {
                tokens.push({ type: 'del_open' });
                tokens.push(...tokenizeInline(text.slice(i + 2, end)));
                tokens.push({ type: 'del_close' });
                i = end + 2;
                continue;
            }
        }

        // Просто текст
        tokens.push({ type: 'text', value: text[i] });
        i++;
    }

    return tokens;
};
