interface ObjectConstructor {
  entries<T, K extends keyof T>(o: T): [K, T[K]][];
  keys<T, K extends keyof T>(o: T): K[];
}

declare type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
