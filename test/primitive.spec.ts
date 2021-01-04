import stringify from "../src";

test("undefined", () => {
  expect(stringify(undefined)).toEqual(undefined);
});

test("true", () => {
  expect(stringify(true)).toEqual("true");
});

test("string", () => {
  expect(stringify("foo")).toEqual(`"foo"`);
});

test("symbol", () => {
  expect(stringify(Symbol(""))).toEqual(undefined);
});

test("NaN", () => {
  expect(stringify(NaN)).toEqual("null");
});

test("Infinity", () => {
  expect(stringify(Infinity)).toEqual("null");
});

test("null", () => {
  expect(stringify(null)).toEqual("null");
});
