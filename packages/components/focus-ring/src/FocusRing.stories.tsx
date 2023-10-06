import { FocusRing as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'FocusRing',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>
    <button>Hello World</button>
  </Component>
);

export const FocusRing: StoryFn<typeof Component> = Template.bind({});

FocusRing.args = {};
