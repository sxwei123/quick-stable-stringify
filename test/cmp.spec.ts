import stringify from "../src";

test("custom comparison function", () => {
  const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
  const s = stringify(obj, function (a, b) {
    return a.key < b.key ? 1 : -1;
  });
  expect(s).toEqual('{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
});
