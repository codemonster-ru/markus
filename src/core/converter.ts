import rules from '../rules/index';

export default class {
    getHtml(content: string) {
        Object.keys(rules).map((key: string) => {
            const rule: RuleType = rules[key] as RuleType;

            content = content.replaceAll(rule.md.search, rule.md.replace);
        });

        return content;
    }
}
