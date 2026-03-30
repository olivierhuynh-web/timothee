'use client';

import { createContext, useContext, useRef } from 'react';

const LayoutRefsContext = createContext(null);

export function LayoutRefsProvider({ children }) {
  const value = {
    mainRef: useRef(null),
    sidebarRef: useRef(null),
    wrapperRef: useRef(null),
    articlesRef: useRef(null),
    indexButtonRef: useRef(null),
    sidebarHeaderRef: useRef(null),
    projectsListRef: useRef(null),
    projectPicturesRefs: useRef([]),
    articlesMenuRef: useRef(null),
    projectsInMainRef: useRef(null),
    placeholderRef: useRef(null),
  };

  return (
    <LayoutRefsContext.Provider value={value}>
      {children}
    </LayoutRefsContext.Provider>
  );
}

export function useLayoutRefs() {
  const context = useContext(LayoutRefsContext);

  if (!context) {
    throw new Error('useLayoutRefs must be used within LayoutRefsProvider');
  }

  return context;
}
