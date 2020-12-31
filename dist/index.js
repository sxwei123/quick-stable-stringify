"use strict";
const jsonStringify = (
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
data, opts) => {
    let comparator;
    let allowCycle = false;
    if (typeof opts === "function") {
        comparator = opts;
    }
    else {
        allowCycle = (opts === null || opts === void 0 ? void 0 : opts.cycles) === true;
        comparator = opts === null || opts === void 0 ? void 0 : opts.cmp;
    }
    const seen = new Set();
    return (function stringify(node) {
        if (node && node.toJSON && typeof node.toJSON === "function") {
            node = node.toJSON();
        }
        if (node === undefined)
            return;
        if (typeof node === "number")
            return isFinite(node) ? "" + node : "null";
        if (typeof node !== "object")
            return JSON.stringify(node);
        let out = "";
        if (Array.isArray(node)) {
            out += "[";
            for (let i = 0; i < node.length; i++) {
                if (i)
                    out += ",";
                out += stringify(node[i]) || "null";
            }
            return out + "]";
        }
        if (node === null)
            return "null";
        if (seen.has(node)) {
            if (allowCycle)
                return JSON.stringify("__cycle__");
            throw new TypeError("Converting circular structure to JSON");
        }
        seen.add(node);
        const sortedKeys = comparator
            ? Object.entries(node)
                .sort((a, b) => comparator({
                key: a[0],
                value: a[1],
            }, {
                key: b[0],
                value: b[1],
            }))
                .map((keyValue) => keyValue[0])
            : Object.keys(node).sort();
        for (const key of sortedKeys) {
            const value = stringify(node[key]);
            if (!value)
                continue;
            if (out)
                out += ",";
            out += `"${key}":${value}`;
        }
        seen.delete(node);
        return `{${out}}`;
    })(data);
};
jsonStringify.default = jsonStringify;
module.exports = jsonStringify;
//# sourceMappingURL=index.js.map