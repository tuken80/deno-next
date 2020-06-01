import { Observable } from "https://raw.githubusercontent.com/DenoBRComunitty/rxjs/master/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { ObjectHelper } from "../helpers/objectHelper.ts";
import { ErrorHandler } from "../handler/errorHandler.ts";
import { NextFile } from "./file.js";
class NextBrowser {
  constructor() {
    this._routes = new Array();
    this._defaultRoutes = new Array();
  }

  bootstrap(html = "", config = {}) {
    return new Observable((subscriber) => {
      if (typeof config.routing.routes !== undefined) {
        this._routes = ObjectHelper.extractRouter(
          config.routing.routes,
          "child"
        );
      }
      const app = new Application();
      app.use(async (ctx, next) => {
        this._defaultRoutes = [
          {
            type: "application/javascript",
            path: "next.script.js",
            content: NextFile("next.script.js", import.meta.url),
          },
        ];
        await next();
        const url = ctx.request.url.pathname.substring(1);
        let activeIsDefaultRoute = await this._defaultRoutes.find(
          (x) => x.path === url
        );
        if (!activeIsDefaultRoute) {
          let activeRoute = await this._routes.find((x) => x.path === url);
          if (activeRoute) {
            const activeRoutes = new activeRoute.component();
            ctx.response = Object.assign(ctx.response, {
              type: "html",
              body: this.insertNextInPage(html),
            });
          } else {
            if (url.length > 0) {
              ctx.response = Object.assign(ctx.response, {
                type: "html",
                body:
                  `<script>console.error(` +
                  "`" +
                  ErrorHandler.routeNotFound(url) +
                  "`" +
                  `),window.history.pushState({},"","/")</script>`,
              });
            } else {
              console.log(config.routing.errors[404]);
              if (typeof config.routing.errors[404] !== undefined) {
                ctx.response = Object.assign(ctx.response, {
                  type: "html",
                  body:
                    `<script>window.history.pushState({},"","/` +
                    config.routing.errors[404] +
                    `")</script>`,
                });
              } else {
                ctx.response = Object.assign(ctx.response, {
                  type: "html",
                  body:
                    `<script>console.error(` +
                    "`" +
                    ErrorHandler.routeNotFound(url) +
                    "`" +
                    `),window.history.pushState({},"","/")</script>`,
                });
              }
            }
          }
        } else {
          ctx.response.type = activeIsDefaultRoute.type;
          ctx.response.body = activeIsDefaultRoute.content;
        }
      });

      app.listen({ port: 8000 });
      subscriber.next();
    });
  }

  insertNextInPage(html = "") {
    let nextHtml = html.split("</body>");
    nextHtml.splice(1, 0, `<script src="next.script.js"></script> </body>`);
    html = nextHtml
      .join("")
      .replace("\n", "")
      .replace("\u0000", "")
      .replace(`'/>\s*</', '><'`, "");
    return html;
  }
}

export const Next = NextBrowser;
