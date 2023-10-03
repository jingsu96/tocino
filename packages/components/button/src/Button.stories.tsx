import * as React from 'react';
import { Button as Component, ButtonProps } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'Button',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = (args: ButtonProps) => {
  return <Component {...args}>Elevated Button</Component>;
};

export const Button: StoryFn<typeof Component> = Template.bind({});

Button.args = {
  variant: 'elevated',
};
