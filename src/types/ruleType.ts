interface RuleType {
    md: {
        search: RegExp;
        replace: string;
    };
}

interface RulesType {
    [key: string]: RuleType;
}
