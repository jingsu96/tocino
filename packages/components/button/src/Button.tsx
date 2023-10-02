import React from 'react';
import '@tocino-ui/css/dist/button.css';

export type ButtonProps = {
  /** Add a description comment for each prop. */
};

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(() => {
  return (
    <div>
      <span className="button-label">Hello World</span>
    </div>
  );
});

Button.displayName = 'Button';
