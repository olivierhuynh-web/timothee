/**
 * Context pour gérer les refs et l'état global des animations
 */
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { getProjects } from '../lib/strapi';
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
  const [currentProjectDescription, setCurrentProjectDescription] = useState('');
  const [database, setDatabase] = useState({ projects: [] });
  const [isLoading, setIsLoading] = useState(true);
  // const [scrollPositions, setScrollPositions] = useState({});

  // Charger les projets depuis Strapi au montage du composant
  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      const projects = await getProjects();
      setDatabase({ projects });
      setIsLoading(false);
    }

    loadProjects();
  }, []);

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
        currentProjectDescription,
        database,
        isLoading,

        // Setters
        setIsMainOpen,
        setOpenedProject,
        setVisibleProjectIndex,
        setCurrentProjectDescription,

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
