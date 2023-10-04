import type { Preview } from '@storybook/react';

export const globalTypes = {
  'storybook-addon-theme-switcher/theme': {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['dark', 'light'],
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    themeSwitcher: {
      themes: ['light', 'dark'],
      dataAttribute: 'theme',
      icon: 'circlehollow',
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'theme-twt' },
        { name: 'dark', class: 'theme-fb' },
      ],
    },
  },
};

export default preview;
