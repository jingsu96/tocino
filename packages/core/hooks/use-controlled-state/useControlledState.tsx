import { useCallback } from 'react';
import { useUncontrolledState } from '../use-uncontrolled-state';
import { useCallbackRef } from '../use-callback-ref';

export type UseControllableStateParams<T> = {
  value?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: (value: T) => void;
};

function useControlledState<T>({ value, defaultValue, onChange }: UseControllableStateParams<T>) {
  const [uncontrolledState, setUncontrolledState] = useUncontrolledState<T>({ defaultValue, onChange });
  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolledState;
  const handleChange = useCallbackRef(onChange);

  const setState: React.Dispatch<React.SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as (prevState?: T) => T;
        const v = typeof nextValue === 'function' ? setter(value) : nextValue;
        if (v !== value) {
          handleChange?.(v as T);
        }
      } else {
        setUncontrolledState(nextValue as T);
      }
    },
    [isControlled, handleChange, value],
  );

  return [state, setState];
}

export { useControlledState };
