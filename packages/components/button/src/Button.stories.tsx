import * as React from 'react';
import { Button as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'Button',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Button: StoryFn = Template.bind({});

Button.args = {};
