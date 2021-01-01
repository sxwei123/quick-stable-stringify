# quick-stable-stringify

![Test status](https://github.com/sxwei123/quick-stable-stringify/workflows/Test/badge.svg?branch=develop)

Deterministic `JSON.stringify()` - a faster version of [@epoberezkin](https://github.com/epoberezkin)'s [fast-json-stable-strigify](https://github.com/epoberezkin/fast-json-stable-stringify). Built with Typescript and modern Javascript.

## Features

- Support both browser and nodejs
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

Node.JS with CommonJS:

```js
const stringify = require("quick-stable-stringify");

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(stringify(obj));
```

Typescript or modern Javascript environment:

```ts
import stringify from "quick-stable-stringify";

const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(stringify(obj));
```

## Options

Options can be a comparator function or an object which has two optional properties: `cmp` and `cycles`.

### cmp

`opts.cmp` is the custom comparator function that user can specify. If custom comparator function is not provided, the JSON string of an object will be sorted by the alphanumeric order of object keys.
The type of the comparator function is defined as:

```ts
interface KeyValue {
  key: string;
  value: any;
}

type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;
```

For example, to sort on the object key names in reverse order:

```js
var stringify = require("quick-stable-stringify");

var obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
var s = stringify(obj, function (a, b) {
  return a.key < b.key ? 1 : -1;
});
console.log(s);
```

which results in the output string:

```
{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}
```

To sort on the object values in reverse order:

```js
var stringify = require("quick-stable-stringify");

var obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
var s = stringify(obj, function (a, b) {
  return a.value < b.value ? 1 : -1;
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

# benchmark

To run benchmark (requires Node.js 6+):

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

# license

[MIT](https://github.com/epoberezkin/fast-json-stable-stringify/blob/master/LICENSE)
