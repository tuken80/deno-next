import { Next, NextFile } from "../mod.js";
import { ToolbarComponent } from "./toolbar/toolbar.js";
const routes = [
  {
    path: "toolbar",
    component: ToolbarComponent,
  },
];
new Next().bootstrap(await NextFile("index.html", import.meta.url), routes, "next-app"));
