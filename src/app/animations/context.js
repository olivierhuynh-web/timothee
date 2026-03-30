import { useMemo } from 'react';
import { LayoutRefsProvider, useLayoutRefs } from './providers/LayoutRefsProvider';
import { PortfolioDataProvider, usePortfolioData } from './providers/PortfolioDataProvider';
import { PortfolioUIProvider, usePortfolioUI } from './providers/PortfolioUIProvider';
import { StickersProvider, useStickers } from './providers/StickersProvider';

export function RefsProvider({ children }) {
  return (
    <LayoutRefsProvider>
      <PortfolioDataProvider>
        <PortfolioUIProvider>
          <StickersProvider>
            {children}
          </StickersProvider>
        </PortfolioUIProvider>
      </PortfolioDataProvider>
    </LayoutRefsProvider>
  );
}

export function useRefs() {
  const layoutRefs = useLayoutRefs();
  const portfolioData = usePortfolioData();
  const portfolioUI = usePortfolioUI();
  const stickers = useStickers();

  return useMemo(
    () => ({
      ...layoutRefs,
      ...portfolioData,
      ...portfolioUI,
      ...stickers,
    }),
    [layoutRefs, portfolioData, portfolioUI, stickers]
  );
}
