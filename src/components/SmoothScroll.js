'use client';

import { useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const SmoothScroll = ({ children }) => {
  useSmoothScroll();
  
  return <>{children}</>;
};

export default SmoothScroll;
