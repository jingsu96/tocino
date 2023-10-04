import React, { useState, useEffect, useCallback, useRef } from 'react';
import { domUtils } from './utils';
import '@tocino-ui/css/dist/ripple.css';

export type RippleProps = {
  /** Add a description comment for each prop. */
  target: React.RefObject<HTMLButtonElement>;
};

/**
 * =================
 *  useRipple
 * =================
 */

export const useRipple = ({ target }: RippleProps) => {
  const [rippleStyle, setRippleStyle] = useState({});
  const [rippleIsVisible, setRippleIsVisible] = useState(false);
  const rippleElRef = useRef(null);

  useEffect(() => {
    target.current?.addEventListener('touchstart', showRipple, { passive: true });
    target.current?.addEventListener('mousedown', showRipple, { passive: true });
    target.current?.addEventListener('mouseup', hideRipple, { passive: true });
    target.current?.addEventListener('mouseleave', hideRipple, { passive: true });
    return () => {
      target.current?.removeEventListener('touchstart', showRipple);
      target.current?.removeEventListener('mousedown', showRipple);
      target.current?.removeEventListener('mouseup', hideRipple);
      target.current?.removeEventListener('mouseleave', hideRipple);
    };
  }, []);

  const showRipple = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (evt: any) => {
      const buttonEl = target.current;

      if (!buttonEl || ('ontouchstart' in buttonEl && evt.type === 'mousedown')) {
        return;
      }

      const offset = domUtils.offset(buttonEl);
      const clickEvent = evt.type === 'touchstart' && evt.touches ? evt.touches[0] : evt;

      const radius = Math.sqrt(offset.width * offset.width + offset.height * offset.height);
      const diameterPx = radius * 2 + 'px';

      setRippleStyle({
        top: Math.round(clickEvent.pageY - offset.top - radius) + 'px',
        left: Math.round(clickEvent.pageX - offset.left - radius) + 'px',
        width: diameterPx,
        height: diameterPx,
      });

      setRippleIsVisible(true);
    },
    [rippleElRef],
  );

  const hideRipple = useCallback(() => {
    setRippleIsVisible(false);
  }, []);

  useEffect(() => {
    const rippleEl = rippleElRef.current;

    if (!rippleEl) return;

    if (rippleIsVisible) {
      domUtils.removeClass(rippleEl, 'tocino--Ripple-animating');
      domUtils.addClass(rippleEl, 'tocino--Ripple-visible');

      requestAnimationFrame(() => {
        domUtils.addClass(rippleEl, 'tocino--Ripple-animating');
      });
    } else {
      requestAnimationFrame(() => {
        domUtils.removeClass(rippleEl, 'tocino--Ripple-visible');
      });
    }
  }, [rippleIsVisible]);

  return {
    rippleStyle,
    rippleElRef,
  };
};

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>((props) => {
  const { rippleStyle, rippleElRef } = useRipple(props);

  return (
    <span className="tocino-Ripple__container" aria-hidden={true}>
      <span className="tocino-Ripple" ref={rippleElRef} style={rippleStyle} />
    </span>
  );
});

Ripple.displayName = 'Ripple';
