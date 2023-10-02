import { useEffect, useState, useRef } from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { UseControllableStateParams } from '../use-controlled-state';

function useUncontrolledState<T>({ defaultValue, onChange }: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrollState = useState<T | undefined>(defaultValue);
  const [value] = uncontrollState;
  const previousValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (value !== previousValueRef?.current) {
      handleChange?.(value as T);
      previousValueRef.current = value;
    }
  }, [value, previousValueRef, onChange]);

  return uncontrollState;
}

export { useUncontrolledState };
