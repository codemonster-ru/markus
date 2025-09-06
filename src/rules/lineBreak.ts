export default {
    lineBreak: {
        md: {
            search: /[ ]{2,}(?=\n|$)/gm,
            replace: '<br>',
        },
    },
} satisfies RulesType;
