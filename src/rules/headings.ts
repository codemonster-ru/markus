export default {
    h1: {
        md: {
            search: /^# (.*)$/gm,
            replace: '<h1>$1</h1>',
        },
    },
    h1Alt: {
        md: {
            search: /^(.+)\n=+\s*(?=\n$)/gm,
            replace: '<h1>$1</h1>',
        },
    },
    h2Alt: {
        md: {
            search: /^(.+)\n-+\s*(?=\n|$)/gm,
            replace: '<h2>$1</h2>',
        },
    },
    h2: {
        md: {
            search: /^## (.*)$/gm,
            replace: '<h2>$1</h2>',
        },
    },
    h3: {
        md: {
            search: /^### (.*)$/gm,
            replace: '<h3>$1</h3>',
        },
    },
    h4: {
        md: {
            search: /^#### (.*)$/gm,
            replace: '<h4>$1</h4>',
        },
    },
    h5: {
        md: {
            search: /^##### (.*)$/gm,
            replace: '<h5>$1</h5>',
        },
    },
    h6: {
        md: {
            search: /^###### (.*)$/gm,
            replace: '<h6>$1</h6>',
        },
    },
} satisfies RulesType;
