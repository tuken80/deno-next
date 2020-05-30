class ObjectHelperClass {
  extractRouter(root: any, extractFrom: string): Array<any> {
    let finalArray: any = [];
    root.forEach((element: any) => {
      finalArray.push(...this.extractObject(element, extractFrom));
    });
    return finalArray;
  }
  extractObject(root: any, extractFrom: any, path = ""): any {
    const keys = Object.keys(root);
    let objectExtrated: any = new Object();
    keys.forEach((value: any) => {
      if (value !== extractFrom)
        objectExtrated[value] =
          value === "path" && path !== ""
            ? path + "/" + root[value]
            : root[value];
    });
    const res: any = [];
    res.push(objectExtrated);
    if (typeof root[extractFrom] !== "undefined") {
      root[extractFrom].forEach((element: any) => {
        res.push(...this.extractObject(element, extractFrom, root.path));
      });
    }
    return res;
  }
}

export const ObjectHelper: ObjectHelperClass = new ObjectHelperClass();
