import { Observable } from "https://raw.githubusercontent.com/DenoBRComunitty/rxjs/master/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { ObjectHelper } from "../helpers/objectHelper.ts";
import { ErrorHandler } from "../handler/errorHandler.ts";
class NextBrowser {
  constructor() {
    this._routes = new Array();
    this._defaultRoutes = new Array();
  }

  bootstrap(
    html = '',
    routes = new Array(),
    defaultSelector = "next-app",
  ) {
    return new Observable((subscriber) => {
      this._routes = ObjectHelper.extractRouter(routes, "child");
      const app = new Application();
      app.use(async (ctx, next) => {
        console.log(new URL("next.script.js", import.meta.url));
        this._defaultRoutes = [
          {
            type: "application/javascript",
            path: "next.script.js",
            content: await Deno.open('src/core/next/next.script.js'),
          },
        ];
        const host = ctx.request.headers.get("Host");
        console.log('a');
        await next();
        const url = ctx.request.url.pathname.substring(1);
        let activeDefaultRoute = await this._defaultRoutes.find((x) => x.path === url);
        if(!activeDefaultRoute) {
          let activeRoute = await this._routes.find((x) => x.path === url);
          if (activeRoute) {
            const activeRoutes = new activeRoute.component();
            ctx.response.type = "html";
            const buf = new Uint8Array(8240);
            const html2 = await Deno.read(html.rid, buf);
            let html5 = new TextDecoder().decode(buf).toString().split("</body>");
            html5.splice(1,0, `<script src="next.script.js"></script> </body>`)
            let html4 = html5.join('');
            html4 = html4.replace('\n', '').replace('\u0000', '').replace(`'/>\s*</', '><'`, '')
            ctx.response.body = html4;
          } else {
            if (url.length > 0) {
              ctx.response.type = "html";
              ctx.response.body =
                `<script>console.error(` +
                "`" +
                ErrorHandler.routeNotFound(url) +
                "`" +
                `),window.history.pushState({},"","/")</script>`;
            } else {
              ctx.response.body = "";
            }
          }
        } else {
          ctx.response.type = activeDefaultRoute.type;
          ctx.response.body = activeDefaultRoute.content;
        }
      });

      app.listen({ port: 8000 });
      console.log("Next Application is running");
    });
  }
}

export const Next = NextBrowser;
