# quick-stable-stringify

![Test status](https://github.com/sxwei123/quick-stable-stringify/workflows/Lint%20and%20Test/badge.svg?branch=master)

Deterministic `JSON.stringify()`. Sort Javascript object in alphabetical order or the comparator function you specify.

A faster version of [@epoberezkin](https://github.com/epoberezkin)'s [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify). Built with Typescript and modern Javascript.

## Compatibility

NodeJS 10+ or browser with ES2015 support.

## Features

- Support both browser and NodeJS
- Support custom comparator function
- No dependencies

## Install

With npm do:

```
npm install quick-stable-stringify
```

Or install with yarn:

```
yarn add quick-stable-stringify
```

## Examples

```js
// Node.JS with CommonJS
const stringify = require("quick-stable-stringify");
// Typescript or modern Javascript environment
import stringify from "quick-stable-stringify";

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(stringify(obj));
```

## Options

Options can be a comparator function or an object which has two optional properties: `cmp` and `cycles`.

### cmp

`opts.cmp` is the custom comparator function that user can specify. If custom comparator function is not provided, the JSON string of an object will be sorted by the alphabetical order of object keys.
The type of the comparator function is defined as:

```ts
interface KeyValue {
  key: string;
  value: any;
}

type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;
```

For example, to sort by the object keys in reverse order:

```js
const stringify = require("quick-stable-stringify");

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
const s = stringify(obj, function (a, b) {
  return a.key < b.key ? 1 : a.key === b.key ? 0 : -1;
});
console.log(s);
```

which results in the output string:

```
{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
```

To sort by the object values in reverse order:

```js
const stringify = require("quick-stable-stringify");

const obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
const s = stringify(obj, function (a, b) {
  return a.value < b.value ? 1 : a.value === b.value ? 0 : -1;
});
console.log(s);
```

which outputs:

```
{"d":6,"c":5,"b":[{"z":3,"y":2,"x":1},9],"a":10}
```

### cycles

Pass `true` in `opts.cycles` to stringify circular property as `__cycle__` - the result will not be a valid JSON string in this case.

TypeError will be thrown in case of circular object without this option.

## Benchmark

To run benchmark (requires Node.js 10+):

```
node benchmark
```

Results:

```
quick-stable-stringify x 25,499 ops/sec ±1.79% (82 runs sampled)
fast-json-stable-stringify x 18,566 ops/sec ±0.43% (89 runs sampled)
json-stable-stringify x 14,453 ops/sec ±0.62% (88 runs sampled)
fast-stable-stringify x 20,763 ops/sec ±0.58% (88 runs sampled)
faster-stable-stringify x 18,320 ops/sec ±0.90% (88 runs sampled)
The fastest is quick-stable-stringify
```

## Security contact

Mail to: [sxwei321@gmail.com](mailto:sxwei321@gmail.com)

Please do NOT report security vulnerability via GitHub issues.

## License

[MIT](https://github.com/sxwei123/quick-stable-stringify/blob/master/LICENSE)
