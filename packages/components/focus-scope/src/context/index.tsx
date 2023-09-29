import React, { useContext, PropsWithChildren } from 'react';
import { FocusableElement } from '../utils';

/**
 * ======== Type Declarations ========
 */

export interface FocusManagerOptions {
  /** The element to start searching from. The currently focused element by default. */
  from?: Element;
  /** Whether to only include tabbable elements, or all focusable elements. */
  tabbable?: boolean;
  /** Whether focus should wrap around when it reaches the end of the scope. */
  wrap?: boolean;
}

export interface FocusManager {
  /** Moves focus to the next focusable or tabbable element in the focus scope. */
  focusNext(opts?: FocusManagerOptions): FocusableElement | null;
  /** Moves focus to the previous focusable or tabbable element in the focus scope. */
  focusPrevious(opts?: FocusManagerOptions): FocusableElement | null;
  /** Moves focus to the first focusable or tabbable element in the focus scope. */
  focusFirst(opts?: FocusManagerOptions): FocusableElement | null;
  /** Moves focus to the last focusable or tabbable element in the focus scope. */
  focusLast(opts?: FocusManagerOptions): FocusableElement | null;
}

export interface IFocusContext {
  focusManager: FocusManager;
}

/**
 * ======== Context ========
 */

export const FocusScopeContext = React.createContext<IFocusContext | null>(null);

export const useFocusManager = (): FocusManager => {
  const context = useContext(FocusScopeContext);

  if (!context) {
    throw new Error('[Error] useFocusManager must be used within a FocusScope');
  }

  return context.focusManager;
};

export const FocusScopeProvider = (props: PropsWithChildren<{ focusManager: FocusManager }>) => {
  return (
    <FocusScopeContext.Provider value={{ focusManager: props.focusManager }}>
      {props.children}
    </FocusScopeContext.Provider>
  );
};
