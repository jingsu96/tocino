import * as React from 'react';
import { Ripple as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'Ripple',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Ripple: StoryFn<typeof Component> = Template.bind({});

Ripple.args = {};
