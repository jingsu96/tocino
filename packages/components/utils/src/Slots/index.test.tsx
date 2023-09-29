/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useRef, useId } from 'react';

import { render } from '@testing-library/react';
import { SlotProvider, useSlotProps } from '..';

describe('Slots', function () {
  let results = {};

  afterEach(() => {
    results = {};
  });

  function Component(props: any) {
    props = useSlotProps(props, 'slotname');
    results = props;
    const ref = useRef();
    const id = useId();
    return (
      <button id={id} {...props} ref={ref}>
        push me
      </button>
    );
  }

  it('sets props', function () {
    const slots = {
      slotname: { className: 'foo', disabled: true },
    };
    render(
      <SlotProvider slots={slots}>
        <Component />
      </SlotProvider>,
    );
    expect(results).toMatchObject({
      className: 'foo',
      disabled: true,
    });
  });

  it('overrides local props', function () {
    const slots = {
      slotname: { className: 'foo', disabled: false, label: null },
    };
    render(
      <SlotProvider slots={slots}>
        <Component className="bar" disabled label="boop" />
      </SlotProvider>,
    );
    expect(results).toMatchObject({
      className: expect.stringMatching(/(foo bar|bar foo)/),
      disabled: false,
      label: null,
    });
  });
});
