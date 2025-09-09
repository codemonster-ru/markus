interface NodeType {
    type: string;
    children?: NodeType[];
}

interface TextNode extends NodeType {
    type: 'text';
    value: string;
}

interface HeadingNode extends NodeType {
    type: 'heading';
    level: number;
    children: NodeType[];
}

interface ParagraphNode extends NodeType {
    type: 'paragraph';
    children: NodeType[];
}

interface ListNode extends NodeType {
    type: 'list';
    ordered: boolean;
    start?: number;
    children: NodeType[]; // list items
}

interface ListItemNode extends NodeType {
    type: 'list_item';
    children: NodeType[];
}

interface Token {
    type: string;
    [key: string]: any;
}
