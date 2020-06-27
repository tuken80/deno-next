// @ts-ignore
/// <reference path="https://raw.githubusercontent.com/apiel/jsx-html/latest/jsx.d.ts" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export { Next, Browser } from "./src/main.ts";
