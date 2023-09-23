import { useLayoutEffect } from 'react';
import { focusElement } from '../utils';

export const useRestoreFocus = (restoreFocus: boolean) => {
  useLayoutEffect(() => {
    const nodeToRestore = document.activeElement as HTMLElement;

    return () => {
      if (restoreFocus && nodeToRestore) {
        requestAnimationFrame(() => {
          if (document.body.contains(nodeToRestore)) {
            focusElement(nodeToRestore);
          }
        });
      }
    };
  }, [restoreFocus]);
};
