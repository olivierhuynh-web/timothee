/**
 * Context pour gérer les refs et l'état global des animations
 */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import database from '../db/database.json';
import { gsap } from 'gsap';
import {
  createProjectLine,
  updateProjectStyles as updateStyles,
  findHighestVisibleProjectIndex,
  shouldRemoveProject,
  createScrollHandler,
  ANIMATION_DURATION,
} from './projectsScrollHelpers';

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

  // États
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [openedProject, setOpenedProject] = useState(null);

  // Gère le clic sur un projet
  const handleProjectClick = (projectId) => {
    setOpenedProject(projectId);
  };

  // Animation du menu articles : slide de gauche à droite selon l'état isMainOpen
  const slideArticlesMenu = (show) => {
    if (!articlesMenuRef.current) return;

    if (show) {
      gsap.to(articlesMenuRef.current, {
        delay: 0.7,
        left: '0',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(articlesMenuRef.current, {
        left: '-10vw',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  };

  // Effet pour déclencher l'animation quand isMainOpen change
  useEffect(() => {
    // Inversé : le menu apparaît quand isMainOpen est false
    slideArticlesMenu(!isMainOpen);
  }, [isMainOpen]);

  // Gestionnaires d'événements
  const handleMainClick = () => {
    setIsMainOpen(false);
    slideToTheRightOnTheScreen(wrapperRef, articlesRef);
  };

  const handleArticlesMenuClick = () => {
    setIsMainOpen(true);
    slideToTheLeftOnTheScreen(wrapperRef, articlesRef);
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

        // État
        isMainOpen,
        openedProject,
        database,

        // Setters
        setIsMainOpen,
        setOpenedProject,

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

/**
 * Hook personnalisé pour l'effet de scroll des projets
 */
export function useProjectsScrollEffect() {
  const { projectPicturesRefs, projectsListRef, database } = useRefs();

  useEffect(() => {
    let cleanup;

    // Attend que les refs soient prêtes
    const timer = setTimeout(() => {
      cleanup = projectsListScrollEffect(
        projectPicturesRefs,
        projectsListRef,
        database
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [projectPicturesRefs, projectsListRef, database]);
}

/**
 * Animation pour faire glisser l'écran vers la droite (ouvre la section Articles)
 */
export function slideToTheRightOnTheScreen(wrapperRef, articlesRef) {
  gsap.to(wrapperRef.current, {
    x: '-100vw',
    duration: 0.5,
    ease: 'power2.out',
  });
  gsap.to(articlesRef.current, {
    width: '100vw',
    duration: 0.5,
    ease: 'power2.out',
  });
}

/**
 * Animation pour faire glisser l'écran vers la gauche (ferme la section Articles)
 */
export function slideToTheLeftOnTheScreen(wrapperRef, articlesRef) {
  gsap.to(wrapperRef.current, {
    delay: 1,
    x: '0vw',
    duration: 0.5,
    ease: 'power2.inOut',
  });
  gsap.to(articlesRef.current, {
    delay: 1,
    width: '0vw',
    duration: 0.5,
    ease: 'power2.inOut',
  });
}

/**
 * Effet de scroll pour la liste des projets
 * Gère l'affichage dynamique des titres de projets lors du scroll
 */
export function projectsListScrollEffect(
  projectPicturesRefs,
  projectsListRef,
  database
) {
  if (!projectPicturesRefs.current || !projectsListRef.current) return;

  const displayedProjects = new Set();

  // Ajoute un projet à la liste affichée
  const addProject = (index) => {
    if (displayedProjects.has(index) || !database.projects[index]) return;

    displayedProjects.add(index);
    const line = createProjectLine(database.projects[index], index);
    projectsListRef.current.appendChild(line);
    updateStyles(projectsListRef);
  };

  // Retire un projet de la liste affichée
  const removeProject = (index) => {
    if (!displayedProjects.has(index)) return;

    const line = projectsListRef.current.querySelector(
      `[data-project-index="${index}"]`
    );

    if (line) {
      line.style.opacity = '0';
      line.style.transform = 'translateY(-10px)';
      line.style.pointerEvents = 'none';

      setTimeout(() => {
        if (line.parentNode === projectsListRef.current) {
          projectsListRef.current.removeChild(line);
          displayedProjects.delete(index);
          updateStyles(projectsListRef);
        }
      }, ANIMATION_DURATION);
    }
  };

  // Gère la visibilité des projets selon le scroll
  const handleVisibility = (isScrollingUp = false) => {
    const highestVisibleIndex = findHighestVisibleProjectIndex(
      projectPicturesRefs
    );

    if (highestVisibleIndex !== -1) {
      // Ajouter tous les projets visibles
      for (let i = 0; i <= highestVisibleIndex; i++) {
        if (database.projects[i]) {
          addProject(i);
        }
      }

      // Retirer les projets non visibles lors du scroll vers le haut
      if (isScrollingUp) {
        Array.from(displayedProjects).forEach((index) => {
          const ref = projectPicturesRefs.current[index];
          if (shouldRemoveProject(ref, highestVisibleIndex, index)) {
            removeProject(index);
          }
        });
      }
    }
  };

  const handleScroll = createScrollHandler(handleVisibility);

  // Configuration de l'IntersectionObserver
  const observer = new IntersectionObserver(handleVisibility, {
    threshold: 0.1,
    rootMargin: '-10% 0% -10% 0%',
  });

  projectPicturesRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleVisibility();

  // Nettoyage
  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
    if (projectsListRef.current) {
      projectsListRef.current.innerHTML = '';
    }
    displayedProjects.clear();
  };
}

export function animateArticlesMenu(articlesMenuRef) {
  gsap.to(articlesMenuRef.current, {
    width: '10vw',
    duration: 0.5,
    ease: 'power2.out',
  });
}
