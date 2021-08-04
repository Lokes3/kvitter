export function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}
