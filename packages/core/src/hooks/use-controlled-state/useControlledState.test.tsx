/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { useControlledState } from '.';
import userEvent from '@testing-library/user-event';
import { renderHook, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useControlledState tests', function () {
  it('can handle default setValue behavior, wont invoke onChange for the same value twice in a row', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => {
      return useControlledState({ value: undefined, defaultValue: 'defaultValue', onChange });
    });
    let [value, setValue] = result.current;

    expect(value).toBe('defaultValue');
    expect(onChange).not.toHaveBeenCalled();
    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value).toBe('newValue');
    expect(onChange).toHaveBeenCalledWith('newValue');

    act(() => setValue('newValue2'));
    [value, setValue] = result.current;
    expect(value).toBe('newValue2');
    expect(onChange).toHaveBeenCalledWith('newValue2');

    onChange.mockClear();

    act(() => setValue('newValue2'));
    [value, setValue] = result.current;
    expect(value).toBe('newValue2');
    expect(onChange).not.toHaveBeenCalled();

    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value).toBe('newValue');
    expect(onChange).toHaveBeenLastCalledWith('newValue');
  });

  it('using NaN will only trigger onChange once', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => {
      return useControlledState({ value: undefined, defaultValue: undefined, onChange });
    });

    let [value, setValue] = result.current;
    expect(value).toBe(undefined);
    expect(onChange).not.toHaveBeenCalled();
    act(() => setValue(NaN));
    [value, setValue] = result.current;
    expect(value).toBe(NaN);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(NaN);

    act(() => setValue(NaN));
    [value, setValue] = result.current;
    expect(value).toBe(NaN);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('can handle callback setValue behavior', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => {
      return useControlledState({ value: undefined, defaultValue: 'defaultValue', onChange });
    });
    let [value, setValue] = result.current;
    expect(value).toBe('defaultValue');
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      setValue((prev) => {
        expect(prev).toBe('defaultValue');
        return 'newValue';
      });
    });
    [value, setValue] = result.current;
    expect(value).toBe('newValue');
    expect(onChange).toHaveBeenCalledWith('newValue');
  });

  it("doesn't trigger too many renders", () => {
    const renderSpy = jest.fn();

    const TestComponent = (props) => {
      const [state, setState] = useControlledState({ ...props });
      useEffect(() => renderSpy(), [state]);
      return <button onClick={() => setState((prev) => prev + 1)} data-testid={state} />;
    };

    const TestComponentWrapper = (props) => {
      const [state, setState] = useState(props.defaultValue);
      return <TestComponent onChange={(value) => setState(value)} value={state} />;
    };

    const { getByRole, getByTestId } = render(<TestComponentWrapper defaultValue={5} />);
    const button = getByRole('button');
    expect(getByTestId('5')).toBeTruthy();
    expect(renderSpy).toHaveBeenCalledTimes(1);
    act(() => {
      userEvent.click(button);
    });
    getByTestId('6');
    expect(renderSpy).toBeCalledTimes(2);
  });

  it('can handle controlled setValue behavior', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => {
      return useControlledState({ value: 'controlledValue', defaultValue: 'defaultValue', onChange });
    });
    let [value, setValue] = result.current;

    expect(value).toBe('controlledValue');
    expect(onChange).not.toHaveBeenCalled();

    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value).toBe('controlledValue');
    expect(onChange).toHaveBeenLastCalledWith('newValue');

    onChange.mockClear();

    act(() => setValue('controlledValue'));
    [value, setValue] = result.current;
    expect(value).toBe('controlledValue');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('can handle controlled callback setValue behavior after prop change', () => {
    const onChange = jest.fn();
    let propValue = 'controlledValue';
    const { result, rerender } = renderHook(() => {
      return useControlledState({ value: propValue, defaultValue: 'defaultValue', onChange });
    });
    let [value, setValue] = result.current;
    expect(value).toBe('controlledValue');
    expect(onChange).not.toHaveBeenCalled();

    propValue = 'updated';
    rerender();

    act(() => {
      setValue((prevValue) => {
        expect(prevValue).toBe('updated');
        return 'newValue';
      });
    });
    [value, setValue] = result.current;
    expect(value).toBe('updated');
    expect(onChange).toHaveBeenLastCalledWith('newValue');

    onChange.mockClear();

    act(() =>
      setValue((prevValue) => {
        expect(prevValue).toBe('updated');
        return 'updated';
      }),
    );
    [value, setValue] = result.current;
    expect(value).toBe('updated');
    expect(onChange).not.toHaveBeenCalled();
  });
});
