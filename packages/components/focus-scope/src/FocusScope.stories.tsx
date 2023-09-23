import * as React from 'react';
import { FocusScope as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

const storyMetadata: Meta<typeof Component> = {
  title: 'FocusScope',
  component: Component,
};

export default storyMetadata;

const Template: StoryFn<typeof Component> = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Show the dialog</button>
      {show && (
        <Component autoFocus contain restoreFocus>
          <dialog id="favDialog" style={{ display: 'flex' }}>
            <form>
              <div>
                <input placeholder="name" />
              </div>
              <div>
                <input placeholder="address" />
              </div>
              <div>
                <input placeholder="phone" />
              </div>
              <div>
                <button value="cancel" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button id="confirmBtn" value="default" onClick={() => setShow(false)}>
                  Confirm
                </button>
              </div>
            </form>
          </dialog>
        </Component>
      )}
    </div>
  );
};

export const FocusScope: StoryFn = Template.bind({});

FocusScope.args = {};
