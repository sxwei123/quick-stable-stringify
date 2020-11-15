declare module 'fast-json-stable-stringify' {
  interface KeyValue {
    key: string;
    value: any;
  }

  function stringify(
    obj: any,
    opts?: {
      cmp?: (a: KeyValue, b: KeyValue) => number;
      cycles?: boolean;
    }
  ): string;

  export = stringify;
}
