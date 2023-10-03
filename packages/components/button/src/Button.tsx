import React, { PropsWithChildren, useRef } from 'react';
import { Ripple } from '@tocino-ui/ripple';
import '@tocino-ui/css/dist/button.css';

export type ButtonProps = {
  /** Add a description comment for each prop. */
  variant: 'elevated' | 'outlined' | 'text';
};

export const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props) => {
  const { variant, children } = props;
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <button className="tocino-Button" data-variant={variant} ref={btnRef}>
      <span className="button-label">{children}</span>
      <Ripple target={btnRef} color="rgba(0, 0, 0, 0.1)" />
    </button>
  );
});

Button.displayName = 'Button';
