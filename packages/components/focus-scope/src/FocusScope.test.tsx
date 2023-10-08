/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FocusScope } from './';
import { useFocusManager, FocusManager } from './context';

describe('FocusScope', function () {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => jest.runAllTimers());
  });
  describe('focus manager', function () {
    it('should move focus forward', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onClick = () => {
          focusManager.focusNext();
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item2 = getByTestId('item2');
      const item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      fireEvent.click(item1);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item3);
      fireEvent.click(item3);
      expect(document.activeElement).toBe(item3);
    });

    it('should move focus backward', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onClick = () => {
          focusManager.focusPrevious();
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item2 = getByTestId('item2');
      const item3 = getByTestId('item3');

      act(() => {
        item3.focus();
      });

      fireEvent.click(item3);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item1);
      fireEvent.click(item1);
      expect(document.activeElement).toBe(item1);
    });

    it('should move focus forward and wrap around', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onClick = () => {
          focusManager.focusNext({ wrap: true });
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item2 = getByTestId('item2');
      const item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      fireEvent.click(item1);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item3);
      fireEvent.click(item3);
      expect(document.activeElement).toBe(item1);
    });

    it('should move focus backward and wrap around', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onClick = () => {
          focusManager.focusPrevious({ wrap: true });
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item2 = getByTestId('item2');
      const item3 = getByTestId('item3');

      act(() => {
        item3.focus();
      });

      fireEvent.click(item3);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item1);
      fireEvent.click(item1);
      expect(document.activeElement).toBe(item3);
    });

    it('should go to the first focusable element', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
          if (evt.key === 'Home') {
            focusManager.focusFirst({});
          }
        };
        return <button {...props} onKeyDown={onKeyDown} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item3 = getByTestId('item3');

      act(() => {
        item3.focus();
      });

      fireEvent.keyDown(item3, { key: 'Home' });
      expect(document.activeElement).toBe(item1);
    });

    it('should go to the last focusable element', function () {
      function MockButton(props: any) {
        const focusManager: FocusManager = useFocusManager();
        const onKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
          if (evt.key === 'End') {
            focusManager.focusLast({});
          }
        };
        return <button {...props} onKeyDown={onKeyDown} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      fireEvent.keyDown(item3, { key: 'End' });
      expect(document.activeElement).toBe(item3);
    });
  });

  describe('auto focus', function () {
    it('should auto focus first element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <button data-testid="item1">item 1</button>
            <button data-testid="item2">item 2</button>
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item1'));
    });

    it('should auto focus first tabbable element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <div />
            <button data-testid="item1">item 1</button>
            <button data-testid="item2">item 2</button>
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item1'));
    });

    it('should auto focus first tabbable element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <button data-testid="item1">item 1</button>
            <input data-testid="item2" autoFocus />
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item2'));
    });
  });

  describe('contain', function () {
    it('should contain focus within the scope', function () {
      function Component() {
        return (
          <FocusScope contain>
            <input data-testid="item1" />
            <input data-testid="item2" />
            <input data-testid="item3" />
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      const item1 = getByTestId('item1');
      const item2 = getByTestId('item2');
      const item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: 'Tab' });
      expect(document.activeElement).toBe(item2);
      fireEvent.keyDown(item2, { key: 'Tab' });
      expect(document.activeElement).toBe(item3);
      fireEvent.keyDown(item3, { key: 'Tab' });
      expect(document.activeElement).toBe(item1);
      fireEvent.keyDown(item1, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(item3);
      fireEvent.keyDown(item3, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(item2);
      fireEvent.keyDown(item2, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(item1);
    });
  });

  describe('restore focus', function () {
    it.skip('should restore focus to the previously focused node after a child with autoFocus unmounts', function () {
      function Component({ show }: { show?: boolean }) {
        return (
          <div>
            <input data-testid="outside" autoFocus />
            {show && (
              <FocusScope restoreFocus>
                <input data-testid="item1" autoFocus />
                <input data-testid="item2" />
                <input data-testid="item3" />
              </FocusScope>
            )}
          </div>
        );
      }

      const { getByTestId, rerender } = render(<Component />);

      const outside = getByTestId('outside');
      expect(document.activeElement).toBe(outside);
      rerender(<Component show />);
      const item1 = getByTestId('item1');
      expect(document.activeElement).toBe(item1);
      rerender(<Component />);
      expect(document.activeElement).toBe(outside);
    });
  });
});
