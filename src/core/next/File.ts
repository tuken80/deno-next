import { fromFileUrl } from "https://deno.land/std@0.53.0/path/mod.ts";
export async function File(
  file = "",
  metaUrl = "",
  toString = false,
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const url = fromFileUrl(new URL(file, metaUrl));
    const fileStatus = await Deno.lstat(url);
    const buf = new Uint8Array(fileStatus.size);
    const fileRID = await Deno.read((await Deno.open(url)).rid, buf);
    let fileContent = new TextDecoder().decode(buf);
    if (toString) {
      fileContent = fileContent.toString();
    }
    resolve(fileContent);
  });
}
