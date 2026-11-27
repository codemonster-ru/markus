# Markus

Markus is a TypeScript library that converts Markdown to HTML.

## Get started

```bash
npm install @codemonster-ru/markus
```

```ts
import { markdownToHtml } from '@codemonster-ru/markus';

const html = markdownToHtml('# Hello\n\nThis is **Markdown**.');
```

See the [playground cheatsheet](playground/cheatsheet.md) for examples of Markdown syntax.

## Development and support

Run `npm ci` and `npm run build` from the repository root to build the library.
Use [GitHub Issues](https://github.com/codemonster-ru/markus/issues) for questions and reproducible bugs.

Follow the [contribution guide](./CONTRIBUTING.md) to propose changes.
Report vulnerabilities through the [security policy](./SECURITY.md).

Licensed under the [MIT License](LICENSE).
