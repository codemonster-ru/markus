import rules from '../rules/index';

export default class {
    getHtml(content: string) {
        content = content.replaceAll(/\r\n/g, '\n').replaceAll(/\r/g, '\n');

        Object.keys(rules).map((key: string) => {
            const rule: RuleType = rules[key] as RuleType;

            content = content.replaceAll(rule.md.search, rule.md.replace);
        });

        return content;
    }
}
