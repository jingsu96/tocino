import { useCallback, Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (ref == null) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    Reflect.set(ref, 'current', value);
  }
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        assignRef(ref, value);
      });
    },
    [refs],
  );
}
