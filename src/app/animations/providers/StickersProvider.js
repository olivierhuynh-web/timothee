'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { useLayoutRefs } from './LayoutRefsProvider';
import { usePortfolioData } from './PortfolioDataProvider';
import {
  getActiveStickerPaths,
  getScrollTop,
  STICKER_SIZE,
} from '../utils/stickers';

const StickersContext = createContext(null);

export function StickersProvider({ children }) {
  const { mainRef, sidebarRef } = useLayoutRefs();
  const { stickerPaths } = usePortfolioData();
  const [mainClickStickers, setMainClickStickers] = useState([]);
  const [sidebarClickStickers, setSidebarClickStickers] = useState([]);
  const [articlesClickStickers, setArticlesClickStickers] = useState([]);

  const value = useMemo(
    () => ({
      mainClickStickers,
      sidebarClickStickers,
      articlesClickStickers,
      addClickSticker: (event, sectionName, sectionRef) => {
        const clickedElement = event.target;
        const isInNoStickerZone = clickedElement.closest('[data-no-sticker]');
        const isInArticlesSection = sectionName === 'articles';

        if (isInArticlesSection) {
          const isInAllowedZone = clickedElement.closest(
            '[data-sticker-allowed]'
          );

          if (!isInAllowedZone) return;
        } else if (isInNoStickerZone) {
          return;
        }

        const activeStickerPaths = getActiveStickerPaths(stickerPaths);
        const randomSticker =
          activeStickerPaths[
            Math.floor(Math.random() * activeStickerPaths.length)
          ];
        const rotation = Math.random() * 30 - 15;
        const scale = 0.8 + Math.random() * 0.4;
        const baseId = Date.now();
        const viewportX = event.clientX;
        const viewportY = event.clientY;
        const boundaryX = window.innerWidth * 0.6;
        const stickerLeft = viewportX - STICKER_SIZE / 2;
        const stickerRight = stickerLeft + STICKER_SIZE;

        if (sectionName === 'main') {
          const mainRect = mainRef.current.getBoundingClientRect();
          const mainScrollTop = getScrollTop(mainRef);
          const localX = viewportX - mainRect.left - STICKER_SIZE / 2;
          const localY =
            viewportY - mainRect.top + mainScrollTop - STICKER_SIZE / 2;

          setMainClickStickers((prev) => [
            ...prev,
            {
              id: `click-main-${baseId}`,
              src: randomSticker,
              x: localX,
              y: localY,
              rotation,
              scale,
            },
          ]);

          if (stickerRight > boundaryX && sidebarRef.current) {
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const sidebarScrollTop = getScrollTop(sidebarRef);
            const sidebarLocalX = stickerLeft - sidebarRect.left;
            const sidebarLocalY =
              viewportY - sidebarRect.top + sidebarScrollTop - STICKER_SIZE / 2;

            setSidebarClickStickers((prev) => [
              ...prev,
              {
                id: `click-sidebar-mirror-${baseId}`,
                src: randomSticker,
                x: sidebarLocalX,
                y: sidebarLocalY,
                rotation,
                scale,
              },
            ]);
          }

          return;
        }

        if (sectionName === 'sidebar') {
          const sidebarRect = sidebarRef.current.getBoundingClientRect();
          const sidebarScrollTop = getScrollTop(sidebarRef);
          const localX = viewportX - sidebarRect.left - STICKER_SIZE / 2;
          const localY =
            viewportY - sidebarRect.top + sidebarScrollTop - STICKER_SIZE / 2;

          setSidebarClickStickers((prev) => [
            ...prev,
            {
              id: `click-sidebar-${baseId}`,
              src: randomSticker,
              x: localX,
              y: localY,
              rotation,
              scale,
            },
          ]);

          if (stickerLeft < boundaryX && mainRef.current) {
            const mainRect = mainRef.current.getBoundingClientRect();
            const mainScrollTop = getScrollTop(mainRef);
            const mainLocalX = stickerLeft - mainRect.left;
            const mainLocalY =
              viewportY - mainRect.top + mainScrollTop - STICKER_SIZE / 2;

            setMainClickStickers((prev) => [
              ...prev,
              {
                id: `click-main-mirror-${baseId}`,
                src: randomSticker,
                x: mainLocalX,
                y: mainLocalY,
                rotation,
                scale,
              },
            ]);
          }

          return;
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = getScrollTop(sectionRef);
        const localX = viewportX - rect.left - STICKER_SIZE / 2;
        const localY = viewportY - rect.top + scrollTop - STICKER_SIZE / 2;

        setArticlesClickStickers((prev) => [
          ...prev,
          {
            id: `click-articles-${baseId}`,
            src: randomSticker,
            x: localX,
            y: localY,
            rotation,
            scale,
          },
        ]);
      },
    }),
    [articlesClickStickers, mainClickStickers, mainRef, sidebarClickStickers, sidebarRef, stickerPaths]
  );

  return (
    <StickersContext.Provider value={value}>
      {children}
    </StickersContext.Provider>
  );
}

export function useStickers() {
  const context = useContext(StickersContext);

  if (!context) {
    throw new Error('useStickers must be used within StickersProvider');
  }

  return context;
}
