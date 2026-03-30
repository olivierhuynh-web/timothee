'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { useArticlesMenuAnimation } from '../hooks/useArticlesMenuAnimation';
import { useSectionSlider } from '../hooks/useSectionSlider';
import { useLayoutRefs } from './LayoutRefsProvider';

const PortfolioUIContext = createContext(null);

export function PortfolioUIProvider({ children }) {
  const { articlesMenuRef, wrapperRef, articlesRef } = useLayoutRefs();
  const [isMainOpen, setIsMainOpen] = useState(true);

  useArticlesMenuAnimation(articlesMenuRef, isMainOpen);

  const { slideRight, slideLeft } = useSectionSlider(wrapperRef, articlesRef);

  const value = useMemo(
    () => ({
      isMainOpen,
      setIsMainOpen,
      handleMainClick: () => {
        setIsMainOpen(false);
        slideRight();
      },
      handleArticlesMenuClick: () => {
        setIsMainOpen(true);
        slideLeft();
      },
    }),
    [isMainOpen, slideLeft, slideRight]
  );

  return (
    <PortfolioUIContext.Provider value={value}>
      {children}
    </PortfolioUIContext.Provider>
  );
}

export function usePortfolioUI() {
  const context = useContext(PortfolioUIContext);

  if (!context) {
    throw new Error('usePortfolioUI must be used within PortfolioUIProvider');
  }

  return context;
}
