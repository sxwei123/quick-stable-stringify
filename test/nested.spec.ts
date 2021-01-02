/* eslint-disable @typescript-eslint/no-explicit-any */
import stringify from "../src";

test("nested", function () {
  const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
  expect(stringify(obj)).toEqual('{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test("cyclic (default)", () => {
  const one: any = { a: 1 };
  const two: any = { a: 2, one: one };
  one.two = two;
  try {
    stringify(one);
  } catch (ex) {
    expect(ex.toString()).toEqual(
      "TypeError: Converting circular structure to JSON"
    );
  }
});

test("cyclic (specifically allowed)", () => {
  const one: any = { a: 1 };
  const two: any = { a: 2, one: one };
  one.two = two;
  expect(stringify(one, { cycles: true })).toEqual(
    '{"a":1,"two":{"a":2,"one":"__cycle__"}}'
  );
});

test("repeated non-cyclic value", () => {
  const one = { x: 1 };
  const two = { a: one, b: one };
  expect(stringify(two)).toEqual('{"a":{"x":1},"b":{"x":1}}');
});

test("acyclic but with reused obj-property pointers", () => {
  const x = { a: 1 };
  const y = { b: x, c: x };
  expect(stringify(y)).toEqual('{"b":{"a":1},"c":{"a":1}}');
});
