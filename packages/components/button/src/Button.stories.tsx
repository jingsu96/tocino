import * as React from 'react';
import { Button as Component, ButtonProps } from './';

import type { Meta } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'Button',
  component: Component,
  argTypes: {},
};

export default storyMetadata;

const variants = ['elevated', 'outline', 'text', 'filled', 'filled-tonal'] as const;

const Template = (args: ButtonProps) => {
  return variants.map((variant) => {
    return (
      <div style={{ display: 'inline-flex', marginRight: 10 }}>
        <Component {...args} variant={variant}>
          Label
        </Component>
      </div>
    );
  });
};

export const Button = Template.bind({});

Button.args = {};
