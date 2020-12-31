/* eslint-disable @typescript-eslint/no-explicit-any */
interface KeyValue {
  key: string;
  value: any;
}

type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;

interface Option {
  cmp?: ComparatorFunction;
  cycles?: boolean;
}

const jsonStringify = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  opts?: Option | ComparatorFunction
): string | undefined => {
  let comparator: ComparatorFunction | undefined;
  let allowCycle = false;
  if (typeof opts === "function") {
    comparator = opts;
  } else {
    allowCycle = opts?.cycles === true;
    comparator = opts?.cmp;
  }

  const seen: Set<any> = new Set();

  return (function stringify(node: any) {
    if (node && node.toJSON && typeof node.toJSON === "function") {
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node === "number") return isFinite(node) ? "" + node : "null";
    if (typeof node !== "object") return JSON.stringify(node);

    let out = "";

    if (Array.isArray(node)) {
      out += "[";
      for (let i = 0; i < node.length; i++) {
        if (i) out += ",";
        out += stringify(node[i]) || "null";
      }
      return out + "]";
    }

    if (node === null) return "null";

    if (seen.has(node)) {
      if (allowCycle) return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }

    seen.add(node);
    const sortedKeys = comparator
      ? Object.entries(node)
          .sort((a, b) =>
            (comparator as ComparatorFunction)(
              {
                key: a[0],
                value: a[1],
              },
              {
                key: b[0],
                value: b[1],
              }
            )
          )
          .map((keyValue) => keyValue[0])
      : Object.keys(node).sort();

    for (const key of sortedKeys) {
      const value = stringify(node[key]);

      if (!value) continue;
      if (out) out += ",";
      out += `"${key}":${value}`;
    }
    seen.delete(node);
    return `{${out}}`;
  })(data);
};

jsonStringify.default = jsonStringify;
export = jsonStringify;
