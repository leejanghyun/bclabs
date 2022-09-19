import { memo, PropsWithChildren, useMemo } from 'react';
import { createPortal } from 'react-dom';

/** 컴포넌트 Property */
export interface Props {
  elementId: string;
}

/**
 * Portal 컴포넌트
 * @param props 컴포넌트 property
 * @returns Portal 컴포넌트
 */
const Portal = ({ children, elementId }: PropsWithChildren<Props>) => {
  const rootElement = useMemo(() => document.getElementById(elementId) as HTMLElement, [elementId]);

  return createPortal(children, rootElement);
};

export default memo(Portal);
