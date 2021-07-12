/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

  const seenObjects: Set<any> = new Set();

  return (function stringify(node: any): string | undefined {
    if (node && node.toJSON && typeof node.toJSON === "function") {
      node = node.toJSON();
    }

    if (node === undefined) {
      return;
    }
    if (node === null) {
      return "null";
    }
    if (typeof node === "number") {
      return isFinite(node) ? "" + node : "null";
    }
    if (typeof node !== "object") {
      return JSON.stringify(node);
    }

    if (Array.isArray(node)) {
      return `[${node.map((item) => stringify(item) ?? "null").join(",")}]`;
    }

    if (seenObjects.has(node)) {
      if (allowCycle) return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }
    seenObjects.add(node);

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

    const objKeyValues: string[] = [];
    for (const key of sortedKeys) {
      const value = stringify(node[key]);

      if (!value) {
        continue;
      }

      objKeyValues.push(`"${key}":${value}`);
    }

    seenObjects.delete(node);
    return `{${objKeyValues.join(",")}}`;
  })(data);
};

jsonStringify.default = jsonStringify;
export = jsonStringify;
