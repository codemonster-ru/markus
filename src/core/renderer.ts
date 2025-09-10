import { escapeHtml } from './utility';

export const render = (node: NodeType): string => {
    switch (node.type) {
        case 'document':
            return (node.children || []).map(render).join('\n');
        case 'heading':
            const h = node as HeadingNode;
            return `<h${h.level}>${(h.children || []).map(render).join('')}</h${h.level}>`;
        case 'paragraph':
            return `<p>${(node.children || []).map(render).join('')}</p>`;
        case 'list':
            const l = node as ListNode;
            const tag = l.ordered ? 'ol' : 'ul';
            return `<${tag}>${l.children.map(render).join('')}</${tag}>`;
        case 'list_item':
            return `<li>${(node.children || []).map(render).join('')}</li>`;
        case 'text':
            const t = node as TextNode;
            return escapeHtml(t.value);
        case 'softbreak':
            return '\n';
        case 'linebreak':
            return '<br />\n';
        case 'em_open':
            return '<em>';
        case 'em_close':
            return '</em>';
        case 'strong_open':
            return '<strong>';
        case 'strong_close':
            return '</strong>';
        case 'del_open':
            return '<del>';
        case 'del_close':
            return '</del>';
        case 'blockquote':
            if (!('children' in node) || !node.children) return '';

            return `<blockquote>${node.children.map(render).join('')}</blockquote>`;
        default:
            return '';
    }
};
