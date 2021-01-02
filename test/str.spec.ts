import stringify from "../src";

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

test("array with empty string", () => {
  const obj = [4, "", 6];
  expect(stringify(obj)).toEqual('[4,"",6]');
});
