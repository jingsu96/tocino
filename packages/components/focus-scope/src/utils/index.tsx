import { RefObject } from 'react';
import { FocusManager, FocusManagerOptions } from '../context';
/**
 * ======== Type Declarations ========
 */
export type FocusScopeProps = {
  autoFocus?: boolean;
  contain?: boolean;
  restoreFocus?: boolean;
};

export interface FocusableElement extends Element, HTMLOrSVGElement {}

export type IScope = Element[] | null;

/**
 * ======== Utils ========
 */
const focusableElements = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
];

export const FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(',') + ',[tabindex]';

focusableElements.push('[tabindex]:not([tabindex="-1"])');

export const TABBABLE_ELEMENT_SELECTOR = focusableElements.join(':not([tabindex="-1"]),');

export const sharedState: { activeScope: IScope | null } = {
  activeScope: null,
};

export function getScopeRoot(scope: Element[]): Element {
  return scope[0].parentElement as FocusableElement;
}

export function getFocusableTreeWalker(root: Element, opts: FocusManagerOptions, scope: IScope): TreeWalker {
  const selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: FocusableElement) => {
      if (opts.from?.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (node.matches(selector) && (!scope || isElementInScope(node, scope))) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    },
  });

  if (opts.from) {
    walker.currentNode = opts.from;
  }

  return walker;
}

export function isElementInScope(el: Element | null, scope: IScope): boolean {
  if (!scope || !el) {
    return false;
  }
  return scope.includes(el) || scope.some((node) => node.contains(el));
}

export function focusFirstInScope(scope: IScope) {
  if (!scope) {
    return;
  }

  const sential = scope[0].previousElementSibling;

  const root = getScopeRoot(scope);

  if (!root || !sential) {
    return;
  }

  const walker = getFocusableTreeWalker(root, { tabbable: true }, scope);
  walker.currentNode = sential;
  focusElement(walker.nextNode() as FocusableElement);
}

export function focusElement(el: FocusableElement) {
  if (!el) {
    return;
  }

  try {
    el.focus();
  } catch (err) {
    console.warn(err);
  }
}

export const createFocusManager = (scopeRef: RefObject<Element[]>): FocusManager => {
  const getSentinelStart = (scope: Element[]): FocusableElement => scope[0].previousElementSibling as FocusableElement;

  const getSentinelEnd = (scope: Element[]): FocusableElement =>
    scope[scope.length - 1].nextElementSibling as FocusableElement;

  const focusNode = (node: FocusableElement | null) => {
    if (node) {
      focusElement(node);
    }
    return node;
  };

  return {
    focusNext: (opts: FocusManagerOptions = {}): FocusableElement | null => {
      const scope = scopeRef.current as Element[];
      const { from, tabbable, wrap } = opts;
      const node = from || (document.activeElement as FocusableElement);
      const sential = getSentinelStart(scope);

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);
      walker.currentNode = isElementInScope(node, scope) ? node : sential;
      let nextNode = walker.nextNode();

      if (!nextNode && wrap) {
        walker.currentNode = sential;
        nextNode = walker.nextNode();
      }

      return focusNode(nextNode as FocusableElement);
    },
    focusPrevious: (opts: FocusManagerOptions = {}): FocusableElement | null => {
      const scope = scopeRef.current as Element[];
      const { from, tabbable, wrap } = opts;
      const node = from || (document.activeElement as FocusableElement);
      const sential = getSentinelEnd(scope);

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);
      walker.currentNode = isElementInScope(node, scope) ? node : sential;
      let previousNode = walker.previousNode();

      if (!previousNode && wrap) {
        walker.currentNode = sential;
        previousNode = walker.previousNode();
      }

      return focusNode(previousNode as FocusableElement);
    },
    focusFirst: (opts: FocusManagerOptions = {}): FocusableElement | null => {
      const scope = scopeRef.current as Element[];
      const { tabbable } = opts;

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);
      walker.currentNode = getSentinelStart(scope);
      return focusNode(walker.nextNode() as FocusableElement);
    },
    focusLast: (opts: FocusManagerOptions = {}): FocusableElement | null => {
      const scope = scopeRef.current as Element[];
      const { tabbable } = opts;

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);
      walker.currentNode = getSentinelEnd(scope);
      return focusNode(walker.previousNode() as FocusableElement);
    },
  };
};
