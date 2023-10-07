import React, { PropsWithChildren, ButtonHTMLAttributes, useRef } from 'react';
import clsx from 'clsx';

import { Ripple } from '@tocino-ui/ripple';
import { FocusRing } from '@tocino-ui/focus-ring';
import { useSlotProps } from '@tocino-ui/slots';
import { useComposedRefs } from '@tocino-ui/core';

import '@tocino-ui/css/dist/button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Add a description comment for each prop. */
  variant: 'elevated' | 'outline' | 'text' | 'filled' | 'filled-tonal';
  isDisabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, forwardRef) => {
  props = useSlotProps(props, 'button');
  const { variant, children, isDisabled } = props;
  const btnRef = useRef<HTMLButtonElement>(null);
  const ref = useComposedRefs(btnRef, forwardRef);

  return (
    <FocusRing isDisabled={isDisabled}>
      <button
        {...props}
        className={clsx('tocino-Button', { 'is-disabled': isDisabled })}
        data-variant={variant}
        ref={ref}
      >
        <span className="tocino-Button__label">{children}</span>
        <Ripple target={btnRef} />
      </button>
    </FocusRing>
  );
});

Button.displayName = 'Button';
