import { Next, NextFile } from "../mod.js";
import { ToolbarComponent } from "./toolbar/toolbar.js";

const nextConfig = {
  routing: {
    routes: [{
      path: "toolbar",
      component: ToolbarComponent,
    }],
    outlet: 'next-app',
    errors: {
      '404': 'toolbar'
    }
  }
};
new Next().bootstrap(await NextFile("index.html", import.meta.url), nextConfig).subscribe({
  next: (data) => {
console.log('a')
  }, 
  error: (data) => {

  }
});
