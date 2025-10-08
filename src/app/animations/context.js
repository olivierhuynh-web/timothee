//! IMPORT GSAP
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import database from '../db/database.json';
import { gsap } from 'gsap';

const RefsContext = createContext(null);

//! USEREFS

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

  //! USESTATE

  const [isMainOpen, setIsMainOpen] = useState(true);
  const [openedProject, setOpenedProject] = useState(null);

  // Gère le clic sur un projet
  const handleProjectClick = (projectId) => {
    setOpenedProject(projectId);
    console.log(`Projet sélectionné : ${projectId}`);
  };

  //TODO: ANIMATION ARTICLES MENU (A REVOIR)
  const slideArticlesMenu = (show) => {
    if (!articlesMenuRef.current) return;

    if (show) {
      // Animation d'apparition (de gauche à droite)
      gsap.to(articlesMenuRef.current, {
        delay: 0.7,
        left: '0',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      // Animation de disparition (vers la gauche)
      gsap.to(articlesMenuRef.current, {
        left: '-10vw',
        duration: 0.5,
        ease: 'power2.in',
        // onComplete: () => {
        //   console.log('Animation de disparition terminée');
        // },
      });
    }
  };

  // Effet pour déclencher l'animation quand isMainOpen change
  useEffect(() => {
    // Inversé : on veut que le menu apparaisse quand isMainOpen est false
    slideArticlesMenu(!isMainOpen);
  }, [isMainOpen]);

  //! HANDLERS
  const handleMainClick = () => {
    setIsMainOpen(false); // on ferme le main
    slideToTheRightOnTheScreen(wrapperRef, articlesRef);
  };

  const handleArticlesMenuClick = () => {
    setIsMainOpen(true);
    slideToTheLeftOnTheScreen(wrapperRef, articlesRef);
    // animateArticlesMenu;
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

        // State
        isMainOpen,
        openedProject,
        database,

        // Setters
        setIsMainOpen,
        setOpenedProject,

        // Handlers
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

// Hook personnalisé pour l'effet de scroll
export function useProjectsScrollEffect() {
  const { projectPicturesRefs, projectsListRef, database } = useRefs();

  useEffect(() => {
    let cleanup;

    // Attendre que les refs soient prêtes
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

// Animation pour ouvrir le main (fermer la sidebar)
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

export function slideToTheLeftOnTheScreen(wrapperRef, articlesRef) {
  gsap.to(wrapperRef.current, {
    delay: 1,
    x: '0vw',
    duration: 0.5,
    ease: 'power2.inOut',
  });
  gsap.to(articlesRef.current, {
    delay: 1,

    width: '0vw', // ou la largeur initiale souhaitée
    duration: 0.5,
    ease: 'power2.inOut',
  });
}

//! EFFET DE SCROLL SUR LE MAIN (POUR LA LISTE DES PROJETS)

export function projectsListScrollEffect(
  projectPicturesRefs,
  projectsListRef,
  database
) {
  if (!projectPicturesRefs.current || !projectsListRef.current) return;

  // Pour garder la trace des projets affichés
  const displayedProjects = new Set();
  let ticking = false;

  // Fonction pour mettre à jour les styles des projets affichés
  const updateProjectStyles = () => {
    const projectLines = Array.from(projectsListRef.current.children);
    const total = projectLines.length;

    projectLines.forEach((line, i) => {
      const isLast = i === total - 1;

      // Appliquer les styles
      line.style.opacity = isLast ? '1' : '0.6'; // Opacité réduite pour les éléments non sélectionnés
      // line.style.transform = isLast ? 'scale(1)' : 'scale(0.95)';
      // line.style.fontWeight = isLast ? '600' : '400';
      line.style.color = isLast ? 'black' : '#0000007b'; // Rouge plus clair pour les éléments non sélectionnés
    });
  };

  // Fonction pour ajouter un projet
  const addProject = (index) => {
    if (displayedProjects.has(index) || !database.projects[index]) return;

    displayedProjects.add(index);

    // Créer un nouvel élément ligne
    const line = document.createElement('div');
    line.className = 'project-line';
    line.textContent = database.projects[index].name;
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    line.style.transition = 'all 0.3s ease';
    line.dataset.projectIndex = index;

    // Ajouter la classe pour l'animation
    line.classList.add('appearing');

    // Ajouter la ligne au conteneur
    projectsListRef.current.appendChild(line);

    // Mettre à jour les styles après l'ajout
    updateProjectStyles();
  };

  // Fonction pour supprimer un projet
  const removeProject = (index) => {
    if (!displayedProjects.has(index)) return;

    const line = projectsListRef.current.querySelector(
      `[data-project-index="${index}"]`
    );
    if (line) {
      // Animation de disparition
      line.style.opacity = '0';
      line.style.transform = 'translateY(-10px)';
      line.style.pointerEvents = 'none'; // Désactiver les interactions pendant l'animation

      // Suppression après l'animation
      setTimeout(() => {
        if (line.parentNode === projectsListRef.current) {
          projectsListRef.current.removeChild(line);
          displayedProjects.delete(index);
          // Mettre à jour les styles des projets restants
          updateProjectStyles();
        }
      }, 300);
    }
  };

  // Fonction pour gérer la visibilité des projets
  const handleVisibility = (isScrollingUp = false) => {
    // Trouver l'index du projet le plus haut actuellement visible
    let highestVisibleIndex = -1;

    // Parcourir les projets du haut vers le bas
    for (let i = 0; i < projectPicturesRefs.current.length; i++) {
      const ref = projectPicturesRefs.current[i];
      if (!ref) continue;

      const rect = ref.getBoundingClientRect();
      // Ajuster ces valeurs pour contrôler quand le titre apparaît
      // Plus la valeur est proche de 0.5, plus le titre apparaîtra tard
      const visibilityThreshold = 0.3; // 30% de la hauteur de l'écran
      const isVisible =
        rect.top <= window.innerHeight * (1 - visibilityThreshold) &&
        rect.bottom >= window.innerHeight * visibilityThreshold;

      if (isVisible) {
        highestVisibleIndex = i;
      }
    }

    // Si on a trouvé un projet visible
    if (highestVisibleIndex !== -1) {
      // Ajouter tous les projets jusqu'à highestVisibleIndex
      for (let i = 0; i <= highestVisibleIndex; i++) {
        if (database.projects[i]) {
          addProject(i);
        }
      }

      // Supprimer les projets qui ne devraient plus être affichés
      // On supprime un projet uniquement si on scroll vers le haut et qu'il est au-dessus de la zone visible
      if (isScrollingUp) {
        Array.from(displayedProjects).forEach((index) => {
          const ref = projectPicturesRefs.current[index];
          if (!ref) return;

          const rect = ref.getBoundingClientRect();
          const isBelowViewport = rect.top > window.innerHeight * 0.1; // 10% du haut de l'écran

          if (index > highestVisibleIndex && isBelowViewport) {
            removeProject(index);
          }
        });
      }
    }
  };

  // Gestion du scroll avec debounce et suivi de la direction
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const isScrollingUp = window.previousScroll > currentScroll;
        window.previousScroll = currentScroll;

        handleVisibility(isScrollingUp);
        ticking = false;
      });
      ticking = true;
    }
  };

  // Configuration de l'observateur
  const observer = new IntersectionObserver(handleVisibility, {
    threshold: 0.1,
    rootMargin: '-10% 0% -10% 0%',
  });

  // Observer chaque image de projet
  projectPicturesRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  // Ajouter les écouteurs d'événements
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Vérifier la visibilité au chargement initial
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
