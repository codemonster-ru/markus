import Converter from './converter';

export default class {
    private converter: Converter = new Converter();

    getHtml(content: string) {
        return this.converter.getHtml(content);
    }
}
