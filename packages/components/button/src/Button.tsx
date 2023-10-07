import React, { PropsWithChildren, ButtonHTMLAttributes, useRef } from 'react';
import clsx from 'clsx';

import { Ripple } from '@tocino-ui/ripple';
import { FocusRing } from '@tocino-ui/focus-ring';
import { useSlotProps } from '@tocino-ui/slots';
import { useComposedRefs } from '@tocino-ui/core';

import '@tocino-ui/css/dist/button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'elevated' | 'outline' | 'text' | 'filled' | 'filled-tonal';
  isDisabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
  props = useSlotProps(props, 'button');
  const { variant, children, isDisabled } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const composedRefs = useComposedRefs(buttonRef, ref);

  return (
    <FocusRing isDisabled={isDisabled}>
      <button
        {...props}
        className={clsx('tocino-Button', { 'is-disabled': isDisabled })}
        data-variant={variant}
        ref={composedRefs}
      >
        <span className="tocino-Button__label">{children}</span>
        <Ripple target={buttonRef} />
      </button>
    </FocusRing>
  );
});

Button.displayName = 'Button';
