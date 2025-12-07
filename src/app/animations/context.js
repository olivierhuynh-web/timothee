/**
 * Context pour gérer les refs et l'état global des animations
 */
import React, { createContext, useContext, useRef, useState } from 'react';
import database from '../db/database.json';
import { useArticlesMenuAnimation } from './hooks/useArticlesMenuAnimation';
import { useSectionSlider } from './hooks/useSectionSlider';

const RefsContext = createContext(null);

export function RefsProvider({ children }) {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const wrapperRef = useRef(null);
  const articlesRef = useRef(null);
  const indexButtonRef = useRef(null);
  const sidebarHeaderRef = useRef(null);
  const projectsListRef = useRef(null);
  const projectPicturesRefs = useRef([]);
  const articlesMenuRef = useRef(null);
  const projectsInMainRef = useRef(null);
  const placeholderRef = useRef(null);

  // États
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [openedProject, setOpenedProject] = useState(null);
  const [visibleProjectIndex, setVisibleProjectIndex] = useState(null);
  // const [scrollPositions, setScrollPositions] = useState({});

  // Gère le clic sur un projet
  const handleProjectClick = (projectId) => {
    setOpenedProject(projectId);
  };

  // Utilisation des hooks custom pour les animations
  useArticlesMenuAnimation(articlesMenuRef, isMainOpen);
  const { slideRight, slideLeft } = useSectionSlider(wrapperRef, articlesRef);

  // Gestionnaires d'événements
  const handleMainClick = () => {
    setIsMainOpen(false);
    slideRight();
  };

  const handleArticlesMenuClick = () => {
    setIsMainOpen(true);
    slideLeft();
  };

  return (
    <RefsContext.Provider
      value={{
        // Refs
        mainRef,
        sidebarRef,
        wrapperRef,
        articlesRef,
        indexButtonRef,
        sidebarHeaderRef,
        projectsListRef,
        projectPicturesRefs,
        articlesMenuRef,
        projectsInMainRef,
        placeholderRef,

        // État
        isMainOpen,
        openedProject,
        visibleProjectIndex,
        database,

        // Setters
        setIsMainOpen,
        setOpenedProject,
        setVisibleProjectIndex,

        // Gestionnaires
        handleMainClick,
        handleArticlesMenuClick,
        handleProjectClick,
      }}
    >
      {children}
    </RefsContext.Provider>
  );
}

export function useRefs() {
  return useContext(RefsContext);
}
