export function pluckPath(arr: { [k: string]: any }[], path: string) {
  return arr
    .map((item) => {
      if (item === null || item === undefined || item[path] === null)
        return null;
      return path.split(".").reduce((acc: any, key) => {
        if (acc[key] === null || acc[key] === undefined) return null;

        return acc[key];
      }, item);
    })
    .filter((v) => v !== null);
}
