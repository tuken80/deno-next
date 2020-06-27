// @ts-ignore
/// <reference path="https://raw.githubusercontent.com/apiel/jsx-html/latest/jsx.d.ts" />

import Color from "https://deno.land/x/color/index.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { NextConfig } from "../interfaces/NextConfig.ts";
import { File } from "./File.ts";
import { InsertDOM } from "../dom/InsertDOM.ts";

export { React } from "../../jsx/mod.ts";

export class Browser {
  config: NextConfig;
  application: Application;

  constructor(element: any, config: NextConfig) {
    this.config = config;
    this.loadConfig();
    this.application = new Application();
    this.application.use(async (ctx) => {
      const { response, request } = ctx;
      const render = await element.renderElement();
      const main = await File(
        this.config.config.main + ".html",
        this.config.config.path,
      );
      response.type = "html";
      response.body = InsertDOM(main, render, this.config.container);
    });
    this.listen(element);
  }

  async listen(element: any) {
    this.application.addEventListener(
      "listen",
      ({ hostname, port, secure }) => {
        console.log(
          Color.green.text(
            `Listening on: ${secure ? "https://" : "http://"}${hostname ??
              "localhost"}:${port}`,
          ),
        );
      },
    );

    this.application.listen({ port: this.config.config.port }).catch(
      (error) => {
        console.error(Color.red.text(error));
        Deno.exit(1);
      },
    );
  }

  loadConfig() {
    if (!this.config.config.main) {
      this.config.config.main = "index";
    }
  }
}
