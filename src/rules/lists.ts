export default {
    unorderedList: {
        md: {
            search: /((?:^(?:[ \t]*)[-+*]\s.*(?:\n|$))+)/gm,
            replace: (block: string) => {
                const lines = block.trim().split('\n');
                const stack: number[] = [];
                let html = '';

                lines.forEach(line => {
                    const match = line.match(/^([ \t]*)([-+*])\s+(.*)/);
                    if (!match) return;
                    const indent = match[1].replace(/\t/g, '    ').length;
                    const level = Math.floor(indent / 4);
                    const content = match[3];

                    while (stack.length < level + 1) {
                        html += '<ul>';
                        stack.push(level);
                    }
                    while (stack.length > level + 1) {
                        html += '</ul>';
                        stack.pop();
                    }
                    html += `<li>${content}</li>`;
                });
                while (stack.length) {
                    html += '</ul>';
                    stack.pop();
                }
                return html;
            },
        },
    },
    orderedList: {
        md: {
            search: /((?:^(?:[ \t]*)\d+\.\s.*(?:\n|$))+)/gm,
            replace: (block: string) => {
                const lines = block.trim().split('\n');
                const stack: number[] = [];
                let html = '';

                lines.forEach(line => {
                    const match = line.match(/^([ \t]*)(\d+)\.\s+(.*)/);
                    if (!match) return;
                    const indent = match[1].replace(/\t/g, '    ').length;
                    const level = Math.floor(indent / 4);
                    const content = match[3];

                    while (stack.length < level + 1) {
                        html += '<ol>';
                        stack.push(level);
                    }
                    while (stack.length > level + 1) {
                        html += '</ol>';
                        stack.pop();
                    }
                    html += `<li>${content}</li>`;
                });
                while (stack.length) {
                    html += '</ol>';
                    stack.pop();
                }
                return html;
            },
        },
    },
};
