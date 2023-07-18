import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode
}

export const Portal = (props: PortalProps) => {
  const { children } = props;

  return createPortal(children, document.body);
}