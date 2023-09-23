import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { useFocusContainment } from './hooks/useFocusContainment';
import { useRestoreFocus } from './hooks/useRestoreFocus';
import { useAutoFocus } from './hooks/useAutoFocus';

import { FocusScopeProps, createFocusManager } from './utils';
import { FocusScopeProvider } from './context';

export const FocusScope = ({
  children,
  autoFocus = false,
  contain = false,
  restoreFocus = false,
}: PropsWithChildren<FocusScopeProps>) => {
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const scopeRef = useRef<Element[]>([]);

  useEffect(() => {
    let node = startRef.current?.nextSibling;
    const nodes: Element[] = [];

    while (node && node !== endRef.current) {
      nodes.push(node as Element);
      node = node.nextSibling;
    }
    scopeRef.current = nodes;
  }, [children]);

  useAutoFocus(scopeRef, autoFocus);
  useFocusContainment(scopeRef, contain);
  useRestoreFocus(restoreFocus);

  const focusManager = createFocusManager(scopeRef);

  return (
    <FocusScopeProvider focusManager={focusManager}>
      <span hidden ref={startRef} />
      {children}
      <span hidden ref={endRef} />
    </FocusScopeProvider>
  );
};

FocusScope.displayName = 'FocusScope';
