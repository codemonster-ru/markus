import rules from '../rules/index';

export default class {
    getHtml(content: string) {
        content = content.replaceAll(/\r\n/g, '\n').replaceAll(/\r/g, '\n');

        Object.keys(rules).map((key: string) => {
            const rule: RuleType = rules[key] as RuleType;

            if (typeof rule.md.replace === 'string') {
                content = content.replaceAll(rule.md.search, rule.md.replace);
            } else if (typeof rule.md.replace === 'function') {
                content = content.replaceAll(
                    rule.md.search,
                    rule.md.replace as (substring: string, ...args: any[]) => string,
                );
            }
        });

        return content;
    }
}
