import * as React from 'react';
import { Button as Component, ButtonProps } from './';

import type { Meta } from '@storybook/react';
import { SlotProvider } from '@tocino-ui/slots';

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
      <SlotProvider
        slots={{
          button: {
            style: {
              marginRight: 10,
              display: 'inline-flex',
            },
          },
        }}
      >
        <Component {...args} variant={variant}>
          Label
        </Component>
      </SlotProvider>
    );
  });
};

export const Button = Template.bind({});

Button.args = {};
