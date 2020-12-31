# quick-stable-stringify

Deterministic `JSON.stringify()` - a faster version of [@epoberezkin](https://github.com/epoberezkin)'s [fast-json-stable-strigify](https://github.com/epoberezkin/fast-json-stable-stringify). Built with Typescript and modern Javascript.

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
var stringify = require("quick-stable-stringify");
var obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
console.log(stringify(obj));
```

output:

```
{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}
```

## Options

### cmp

If `opts` is given, you can supply an `opts.cmp` to have a custom comparison
function for object keys. Your function `opts.cmp` is called with these
parameters:

```js
opts.cmp({ key: akey, value: avalue }, { key: bkey, value: bvalue });
```

For example, to sort on the object key names in reverse order you could write:

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

Or if you wanted to sort on the object values in reverse order, you could write:

```
var stringify = require('fast-json-stable-stringify');

var obj = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
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
