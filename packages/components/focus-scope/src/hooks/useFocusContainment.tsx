import { RefObject, useEffect, useRef } from 'react';
import {
  FocusableElement,
  isElementInScope,
  sharedState,
  focusFirstInScope,
  focusElement,
  getFocusableTreeWalker,
  getScopeRoot,
} from '../utils';

export const useFocusContainment = (scopeRef: RefObject<Element[]>, contain: boolean) => {
  const focusNode = useRef<FocusableElement>();

  useEffect(() => {
    if (!contain) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      const focusedElement = document.activeElement as FocusableElement;
      const scope = scopeRef.current;

      if (!scope || !isElementInScope(focusedElement, scope)) {
        return;
      }

      const root = getScopeRoot(scope);

      const walker = getFocusableTreeWalker(root, { tabbable: true }, scope);
      walker.currentNode = focusedElement;

      const lastPosition = scope.length - 1;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();

      if (!nextElement) {
        walker.currentNode = e.shiftKey
          ? (scope[lastPosition].nextElementSibling as FocusableElement)
          : (scope[0].previousElementSibling as FocusableElement);
        nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      }

      e.preventDefault();

      if (nextElement) {
        focusElement(nextElement as FocusableElement);
      }
    };

    const onFocus = (e: FocusEvent) => {
      const scope = scopeRef.current;
      const isInScope = isElementInScope(e.target as Element, scope);

      if (isInScope && (!sharedState.activeScope || !isElementInScope(e.target as Element, sharedState.activeScope))) {
        sharedState.activeScope = scope;
      }

      if (isInScope) {
        focusNode.current = e.target as FocusableElement;
      }

      if (sharedState.activeScope === scope) {
        if (focusNode.current) {
          focusNode.current.focus();
        } else {
          focusFirstInScope(scope);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('focusin', onFocus, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('focusin', onFocus, false);
    };
  }, [scopeRef, contain]);
};
