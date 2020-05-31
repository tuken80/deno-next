import { Server } from "https://deno.land/x/http_wrapper@v0.5.0/mod.ts";
import { Router } from "../routing/router.ts";
import {
  Observable,
  BehaviorSubject,
} from "https://raw.githubusercontent.com/DenoBRComunitty/rxjs/master/mod.ts";
// import { fromFileUrl as NextFileURL } from "https://deno.land/std@0.53.0/path/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Route, RouteItem } from "../interfaces/route.ts";
// import * as domTypes from "https://raw.githubusercontent.com/ry/deno/494a7950a985c989e79a220cf350221a8c7d0f96/js/dom_types.ts";
// import { DomHandler } from "https://deno.land/x/domhandler/mod.ts";
import { ObjectHelper } from "../helpers/objectHelper.ts";
import { ErrorHandler } from "../handler/errorHandler.ts";

class NextBrowser {
  next: any;
  _routes: any;
  // _routes = new BehaviorSubject<Route>(new Array(new RouteItem()));
  // routes = this._routes.asObservable();

  constructor() {}

  bootstrap(
    routes: Route,
    defaultSelector: string = "next-app"
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      this._routes = ObjectHelper.extractRouter(routes, "child");
      const app = new Application();
      app.use(async (ctx: any, next) => {
        const host = ctx.request.headers.get("Host");
        await next();
        const url = ctx.request.url.pathname.substring(1);
        let activeRoute = await this._routes.find((x: any) => x.path === url);
        if (activeRoute) {
          activeRoute = new activeRoute.component();
          console.log(
            activeRoute._next_ComponentDecoratorGetAllParams.template
          );
          ctx.response.type = "html";
          ctx.response.body =
            activeRoute._next_ComponentDecoratorGetAllParams.template;
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
      });

      app.listen({ port: 8000 });
    });
  }
}

export const Next = NextBrowser;
