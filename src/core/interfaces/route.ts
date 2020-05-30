export interface Route extends Array<RouteItem> {}
export class RouteItem {
  path: string;
  component: Function;
  child?: Route;

  constructor(routeItem: any = {}) {
    this.path = routeItem.path;
    this.component = routeItem.component;
  }
}
