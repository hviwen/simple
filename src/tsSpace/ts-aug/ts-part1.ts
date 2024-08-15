const enum Color {
  Red,
  Green,
  Blue
}

const color: Color[] = [Color.Red, Color.Green, Color.Blue];

console.log(color); // [0, 1, 2]

function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

function fn(x: string | object) {
  if (isObject(x)) {
    console.log(x)
  } else {
    console.log(x)
  }
}

type _Exclude<T, U> = T extends U ? never : T

type _Extract<T, U> = T extends U ? T : never

type _NonNullable<T> = T extends null | undefined ? never : T

type _ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any

type _Parameters<T> = T extends (...args: infer R) => any ? R : any

type _Partial<T> = { [P in keyof T]?: T[P] }

type _Required<T> = { [P in keyof T]-?: T[P] }

type _Readonly<T> = { readonly [P in keyof T]: T[P] }

type _Pick<T, K extends keyof T> = { [P in K]: T[P] }

type _Record<K extends keyof any, T> = { [P in K]: T }

type _Omit<T, K extends keyof any> = _Pick<T, _Exclude<keyof T, K>>

