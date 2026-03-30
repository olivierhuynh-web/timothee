'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProjects, getStickers } from '../../lib/strapi';
import {
  getActiveStickerPaths,
  preloadStickers,
} from '../utils/stickers';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  const [database, setDatabase] = useState({ projects: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [stickerPaths, setStickerPaths] = useState([]);
  const [openedProject, setOpenedProject] = useState(null);
  const [visibleProjectIndex, setVisibleProjectIndex] = useState(null);
  const [currentProjectDescription, setCurrentProjectDescription] = useState('');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const [projects, stickers] = await Promise.all([
        getProjects(),
        getStickers(),
      ]);

      setDatabase({ projects });
      setStickerPaths(stickers);
      setIsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    preloadStickers(getActiveStickerPaths(stickerPaths));
  }, [stickerPaths]);

  useEffect(() => {
    if (
      visibleProjectIndex !== null &&
      visibleProjectIndex >= 0 &&
      database.projects[visibleProjectIndex]
    ) {
      setCurrentProjectDescription(
        database.projects[visibleProjectIndex].description
      );
      return;
    }

    setCurrentProjectDescription('');
  }, [database.projects, visibleProjectIndex]);

  const value = useMemo(
    () => ({
      database,
      isLoading,
      stickerPaths,
      openedProject,
      setOpenedProject,
      visibleProjectIndex,
      setVisibleProjectIndex,
      currentProjectDescription,
      setCurrentProjectDescription,
      handleProjectClick: setOpenedProject,
    }),
    [
      currentProjectDescription,
      database,
      isLoading,
      openedProject,
      stickerPaths,
      visibleProjectIndex,
    ]
  );

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error(
      'usePortfolioData must be used within PortfolioDataProvider'
    );
  }

  return context;
}
