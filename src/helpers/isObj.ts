export function isObject(obj: Record<string, unknown>): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
