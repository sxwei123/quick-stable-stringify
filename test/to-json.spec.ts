import stringify from "../src";

test("toJSON function", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return { one: 1 };
    },
  };
  expect(stringify(obj)).toEqual('{"one":1}');
});

test("toJSON returns string", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return "one";
    },
  };
  expect(stringify(obj)).toEqual('"one"');
});

test("toJSON returns array", () => {
  const obj = {
    one: 1,
    two: 2,
    toJSON: function () {
      return ["one"];
    },
  };
  expect(stringify(obj)).toEqual('["one"]');
});
