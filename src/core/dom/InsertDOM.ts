export const InsertDOM = (
  element: string,
  insert: string,
  container: string
) => {
  let elementSplit = element.split(`<${container}>`);
  elementSplit.splice(1, 0, `${insert} \n`);

  element = elementSplit
    .join("")
    .split(`</${container}>`)
    .join("")
    .replace("\n", "")
    .replace("\u0000", "")
    .replace(`'/>\s*</', '><'`, "");
  return element;
};
