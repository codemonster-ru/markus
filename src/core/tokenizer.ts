export const tokenize = (input: string): Token[] => {
    const tokens: Token[] = [];
    const lines = input.split(/\r?\n/);

    for (let line of lines) {
        if (/^#{1,6}\s+/.test(line)) {
            const m = line.match(/^(#{1,6})\s+(.*)$/);

            if (m) {
                tokens.push({ type: 'heading', level: m[1].length, content: m[2] });

                continue;
            }
        }

        if (/^\s*[-*+]\s+/.test(line)) {
            tokens.push({ type: 'list_item', content: line.replace(/^\s*[-*+]\s+/, '') });

            continue;
        }

        if (/^\s*$/.test(line)) {
            tokens.push({ type: 'blank' });

            continue;
        }

        // fallback → paragraph line
        tokens.push({ type: 'text_line', content: line });
    }

    return tokens;
};
