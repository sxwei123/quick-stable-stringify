interface KeyValue {
    key: string;
    value: any;
}
declare type ComparatorFunction = (a: KeyValue, b: KeyValue) => number;
interface Option {
    cmp?: ComparatorFunction;
    cycles?: boolean;
}
declare const jsonStringify: {
    (data: any, opts?: Option | ComparatorFunction | undefined): string | undefined;
    default: any;
};
export = jsonStringify;
