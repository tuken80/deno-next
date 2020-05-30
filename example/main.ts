import { fromFileUrl as NextFileURL } from "https://deno.land/std@0.53.0/path/mod.ts";
import { Next, ObjectHelper } from "../mod.ts";
import { ToolbarComponent } from "./toolbar/toolbar.ts";
import { Route } from "../src/core/interfaces/route.ts";

const routes: Route = [
  {
    path: "mtw",
    component: ToolbarComponent,
    child: [
      {
        path: "zim",
        component: ToolbarComponent,
      },
    ],
  },
  {
    path: "vinicius",
    component: ToolbarComponent,
  },
];
new Next().bootstrap(routes, "next-app").subscribe({
  next: (data) => {
    console.log(data);
  },
  error: (data) => {
    console.log("Error" + data);
  },
});
