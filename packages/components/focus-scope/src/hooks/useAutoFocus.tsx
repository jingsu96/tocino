import { RefObject, useEffect } from 'react';
import { sharedState, isElementInScope, focusFirstInScope } from '../utils';

export const useAutoFocus = (scopeRef: RefObject<Element[]>, autoFocus: boolean | null) => {
  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    sharedState.activeScope = scopeRef.current;

    if (!isElementInScope(document.activeElement, sharedState.activeScope)) {
      focusFirstInScope(scopeRef.current);
    }
  }, [scopeRef, autoFocus]);
};
