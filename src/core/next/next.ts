// @ts-ignore
/// <reference path="https://raw.githubusercontent.com/apiel/jsx-html/latest/jsx.d.ts" />

import { Application } from "https://deno.land/x/oak/mod.ts";
export { jsx as Next } from "https://raw.githubusercontent.com/apiel/jsx-html/latest/jsx.ts";

// import { Observable } from "https://raw.githubusercontent.com/DenoBRComunitty/rxjs/master/mod.ts";
// import {
//   NodePropsType,
//   ComponentFunctionType,
//   NullableChildType,
// } from "https://raw.githubusercontent.com/apiel/jsx-html/latest/types.ts";
// import { ObjectHelper } from "../helpers/objectHelper.ts";
// import { ErrorHandler } from "../handler/errorHandler.ts";
// import { NextFile } from "./file.js";
// import { JSX } from "https://raw.githubusercontent.com/apiel/jsx-html/latest/jsx.d.ts";

export class Browser {
  application: Application;

  constructor(element: any) {
    this.application = new Application();
    this.application.use(async (ctx) => {
      const { response, request } = ctx;
      response.type = "html";
      response.body = await element.render();
    });
    this.listen();
  }

  async listen() {
    await this.application.listen({ port: 8080 });
  }
}
