import stringify from "../src";

test("empty object", () => {
  expect(stringify({})).toEqual("{}");
});

test("simple object", () => {
  const obj = { c: 6, b: [4, 5], a: 3, z: null };
  expect(stringify(obj)).toEqual('{"a":3,"b":[4,5],"c":6,"z":null}');
});

test("object with undefined", () => {
  const obj = { a: 3, z: undefined };
  expect(stringify(obj)).toEqual('{"a":3}');
});

test("object with null", () => {
  const obj = { a: 3, z: null };
  expect(stringify(obj)).toEqual('{"a":3,"z":null}');
});

test("object with NaN and Infinity", () => {
  const obj = { a: 3, b: NaN, c: Infinity };
  expect(stringify(obj)).toEqual('{"a":3,"b":null,"c":null}');
});

test("array with undefined", () => {
  const obj = [4, undefined, 6];
  expect(stringify(obj)).toEqual("[4,null,6]");
});

test("object with empty string", () => {
  const obj = { a: 3, z: "" };
  expect(stringify(obj)).toEqual('{"a":3,"z":""}');
});

test("object with Symbol", () => {
  const obj = { a: 12, z: Symbol("") };
  expect(stringify(obj)).toEqual('{"a":12}');
});

test("non-enumerable properties", () => {
  const obj = Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  });
  expect(stringify(obj)).toEqual('{"y":"y"}');
});

test("array with empty string", () => {
  const obj = [4, "", 6];
  expect(stringify(obj)).toEqual('[4,"",6]');
});

test("array with NaN and Infinity", () => {
  const obj = [4, NaN, Infinity];
  expect(stringify(obj)).toEqual("[4,null,null]");
});

test("simple function", () => {
  const obj = () => {
    // empty
  };
  expect(stringify(obj)).toEqual(undefined);
});

test("standard data structures", () => {
  expect(
    stringify([
      new Set([1]),
      new Map([[1, 2]]),
      new WeakSet([{ a: 1 }]),
      new WeakMap([[{ a: 1 }, 2]]),
    ])
  ).toEqual("[{},{},{},{}]");
});
