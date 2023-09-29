/* eslint-disable  @typescript-eslint/no-explicit-any */
import clsx from 'clsx';

// A utility function to chain functions together and call them in order.
export const chain = (...fns: any[]): ((...args: any[]) => void) => {
  return (...args: any[]) => {
    fns.forEach((fn) => typeof fn === 'function' && fn?.(...args));
  };
};

interface Props {
  [key: string]: any;
}

type PropsArg = Props | null | undefined;

// Infer types from tuples and handle null and undefined values.
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? NullToObject<V> : never;
type NullToObject<T> = T extends null | undefined ? object : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const mergeProps = <T extends PropsArg[]>(...args: T): UnionToIntersection<TupleTypes<T>> => {
  const result: Props = { ...args[0] };

  for (let i = 1; i < args.length; i++) {
    const props = args[i];

    for (const key in props) {
      const a = result[key];
      const b = props[key];

      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        key.startsWith('on') &&
        key.charCodeAt(2) <= 90 &&
        key.charCodeAt(2) >= 65
      ) {
        result[key] = chain(a, b);
        continue;
      }

      if (key === 'className') {
        result[key] = clsx(a, b);
        continue;
      }

      result[key] = b === undefined ? a : b;
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>;
};
