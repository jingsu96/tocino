import { VisuallyHidden as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'VisuallyHidden',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = () => {
  return (
    <button>
      <Component>Like</Component>
      <span aria-hidden>👍</span>
    </button>
  );
};

export const VisuallyHidden: StoryFn = Template.bind({});

VisuallyHidden.args = {};
