export default {
    p: {
        md: {
            search: /^(?!\s*<(h\d|ul|ol|li|p|blockquote|pre|code|img|table|hr|del|em|strong|a|br)>)(?!\s*#)(?!\s*[-+*]\s)(?!\s*\d+\.\s)([^\n]+)$/gm,
            replace: '<p>$2</p>',
        },
    },
} satisfies RulesType;
