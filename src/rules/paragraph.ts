export default {
    p: {
        md: {
            search: /^(?!<h\d>)(?!#)(.+)$/gm,
            replace: '<p>$1</p>',
        },
    },
} satisfies RulesType;
