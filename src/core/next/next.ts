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

class NextBrowser {
  next: any;
  _routes = new BehaviorSubject<Route>(new Array(new RouteItem()));
  routes = this._routes.asObservable();

  constructor() {}

  bootstrap(
    routes: Route,
    defaultSelector: string = "next-app"
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      this._routes.next(ObjectHelper.extractRouter(routes, "child"));
      const app = new Application();
      app.use(async (ctx: any, next) => {
        const host = ctx.request.headers.get("Host");
        await next();
        console.log(`${ctx.request.method} ${ctx.request.url}`);
        console.log(ctx.request.url.toString().split(host)[1].substring(1));
        ctx.response = {
          type: "html",
          body: `<script>window.history.pushState({},"","/");</script>`,
        };
      });

      app.listen({ port: 8000 });
    });
  }
}

export const Next = NextBrowser;
