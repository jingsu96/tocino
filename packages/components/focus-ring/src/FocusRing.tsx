import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import '@tocino-ui/css/dist/focus-ring.css';

export type FocusRingProps = {
  /** Add a description comment for each prop. */
  focusRingClassName?: string;
  focusClass?: string;
  children: ReactElement;
  isDisabled?: boolean;
};

export function FocusRing(props: FocusRingProps) {
  const { children, focusClass, focusRingClassName, isDisabled } = props;
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const child = React.Children.only(children);

  return React.cloneElement(
    child,
    mergeProps(child.props, {
      ...focusProps,
      className: clsx({
        [focusClass || '']: isFocused && !isDisabled,
        [clsx('tocino-focus-ring-wrapper', focusRingClassName)]: isFocusVisible,
        'tocino-focus-ring-wrapper--disabled': isDisabled,
      }),
    }),
  );
}

FocusRing.displayName = 'FocusRing';
