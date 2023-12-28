declare module 'graphql-docs' {
  export interface DocsOptions {
    schema: string;
  }

  export class Docs {
    constructor(options: DocsOptions);

    render(target: HTMLElement): void;
  }
}
