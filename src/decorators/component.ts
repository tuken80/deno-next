export function Component(params: object) {
  return function (constructor: any): any {
    return class extends constructor {
      protected _next_ComponentDecoratorGetAllParams = params;
    };
  };
}
