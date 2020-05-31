class ErrorHandlerClass {
  routeNotFound(routeName: string): string {
    return `
        Error could not find a route: '${routeName}'
      `;
  }
}

export const ErrorHandler: ErrorHandlerClass = new ErrorHandlerClass();
