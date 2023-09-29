/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useContext, useMemo } from 'react';
import { mergeProps } from '../helper';

interface SlotProps {
  slot?: string;
}

const SlotContext = React.createContext(null);

export const useSlotProps = <T,>(props: T & { id?: string }, defaultSlot?: string) => {
  const slot = (props as SlotProps).slot || defaultSlot;
  const context = useContext(SlotContext) || {};

  return mergeProps(props, mergeProps(slot ? (context as any)[slot] : {}, { id: props.id }));
};

export const SlotProvider = (props: any) => {
  const parentSlots = useContext(SlotContext) || {};
  const { slots = {}, children } = props;

  const value: any = useMemo(() => {
    return Object.keys(parentSlots)
      .concat(Object.keys(slots))
      .reduce(
        (acc, props) => ({
          ...acc,
          [props]: mergeProps((parentSlots as any)[props] || {}, slots[props] || {}),
        }),
        {},
      );
  }, [parentSlots, slots]);

  return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>;
};
