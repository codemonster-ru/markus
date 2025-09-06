export default {
    italic: {
        md: {
            search: /(?<!\*)\*(?!\*)([^\s*][^*]*[^\s*]?)\*(?!\*)|(?<!_)_(?!_)([^\s_][^_]*[^\s_]?)_(?!_)/g,
            replace: '<em>$1$2</em>',
        },
    },
    bold: {
        md: {
            search: /(\*\*|__)([^\s*][^*]*[^\s*]?)\1/g,
            replace: '<strong>$2</strong>',
        },
    },
    strikethrough: {
        md: {
            search: /~~([^~]+)~~/g,
            replace: '<del>$1</del>',
        },
    },
} satisfies RulesType;
