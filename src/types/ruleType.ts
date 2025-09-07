interface RuleType {
    md: {
        search: RegExp;
        replace: string | ((...args: any[]) => string);
    };
}

interface RulesType {
    [key: string]: RuleType;
}
