import { render } from '@testing-library/react';
import { VisuallyHidden } from './';

describe('VisuallyHidden', () => {
  it('renders VisuallyHidden component', () => {
    const hiddenText = 'Like';
    const { getByText } = render(
      <button>
        <VisuallyHidden as="span">Like</VisuallyHidden>
        <span aria-hidden>👍</span>
      </button>,
    );
    const visuallyHidden = getByText(hiddenText);
    expect(visuallyHidden.tagName).toBe('SPAN');
  });
});
