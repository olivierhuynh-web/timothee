// Centralisation des animations GSAP
import { gsap } from 'gsap';
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import database from '../db/database.json';

// CONTEXTE DES REFS + ÉTAT GLOBAL + HANDLERS
const RefsContext = createContext(null);

export function RefsProvider({ children }) {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const wrapperRef = useRef(null);
  const articlesRef = useRef(null);
  const indexButtonRef = useRef(null);
  const sidebarHeaderRef = useRef(null);
  const projectsListRef = useRef(null);
  const projectPicturesRefs = useRef([]); // Référence pour les images des projets

  // Ajout de l'état global ici
  const [isMainOpen, setIsMainOpen] = useState(true);

  // Handlers centralisés
  const handleMainClick = () => {
    setIsMainOpen(false);

    animateMainOpen(wrapperRef, articlesRef);
    animationToTheLeftIndexButton(indexButtonRef);
  };

  const handleSidebarClick = () => {
    animateSidebarOpen(wrapperRef, articlesRef);

    animationToTheRightIndexButton(indexButtonRef);
    setIsMainOpen(true);
  };

  return (
    <RefsContext.Provider
      value={{
        mainRef,
        sidebarRef,
        wrapperRef,
        articlesRef,
        indexButtonRef,
        sidebarHeaderRef,
        isMainOpen,
        projectsListRef,
        projectPicturesRefs,
        database,
        setIsMainOpen,
        handleMainClick,
        handleSidebarClick,
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
export function animateMainOpen(wrapperRef, articlesRef) {
  gsap.to(wrapperRef.current, {
    x: '-60vw',
    duration: 0.5,
    ease: 'power2.out',
  });
  gsap.to(articlesRef.current, {
    width: '60vw',
    duration: 0.5,
    ease: 'power2.out',
  });
}

// Animation pour ouvrir la sidebar (fermer le main)
export function animateSidebarOpen(wrapperRef, articlesRef) {
  gsap.to(wrapperRef.current, {
    x: '0%',
    duration: 0.5,
    ease: 'power2.out',
  });
  gsap.to(articlesRef.current, {
    width: '0%',
    duration: 0.5,
    ease: 'power2.out',
  });
}

export function animationToTheRightIndexButton(indexButtonRef, isMainOpen) {
  if (indexButtonRef.current) {
    gsap.to(indexButtonRef.current, {
      marginLeft: '90%',
      duration: 0.5,
      ease: 'power2.out',
    });
  } else {
    console.error('Référence indexButtonRef non définie');
  }
}

export function animationToTheLeftIndexButton(indexButtonRef, isMainOpen) {
  if (indexButtonRef.current) {
    console.log('Animation vers la gauche du bouton index');
    gsap.to(indexButtonRef.current, {
      marginLeft: 'auto',
      marginRight: '90%',
      duration: 0.5,
      ease: 'power2.out',
    });
  } else {
    console.error('Référence indexButtonRef non définie');
  }
}

export function projectsListScrollEffect(
  projectPicturesRefs,
  projectsListRef,
  database
) {
  if (!projectPicturesRefs.current || !projectsListRef.current) return;

  // Pour garder la trace des projets affichés
  const displayedProjects = new Set();
  let ticking = false;
  
  // Fonction pour ajouter un projet
  const addProject = (index) => {
    if (displayedProjects.has(index) || !database.projects[index]) return;
    
    displayedProjects.add(index);
    
    // Créer un nouvel élément ligne
    const line = document.createElement('div');
    line.textContent = database.projects[index].name;
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    line.dataset.projectIndex = index;
    
    projectsListRef.current.appendChild(line);
    
    // Animation d'apparition
    requestAnimationFrame(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    });
  };
  
  // Fonction pour supprimer un projet
  const removeProject = (index) => {
    if (!displayedProjects.has(index)) return;
    
    const line = projectsListRef.current.querySelector(`[data-project-index="${index}"]`);
    if (line) {
      // Animation de disparition
      line.style.opacity = '0';
      line.style.transform = 'translateY(-10px)';
      
      // Suppression après l'animation
      setTimeout(() => {
        if (projectsListRef.current.contains(line)) {
          projectsListRef.current.removeChild(line);
          displayedProjects.delete(index);
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
      const isVisible = (
        rect.top <= window.innerHeight * (1 - visibilityThreshold) &&
        rect.bottom >= window.innerHeight * visibilityThreshold
      );
      
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
        Array.from(displayedProjects).forEach(index => {
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
    const currentScroll = window.scrollY;
    const isScrollingUp = currentScroll < (window.lastScrollY || 0);
    window.lastScrollY = currentScroll;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleVisibility(isScrollingUp);
        ticking = false;
      });
      ticking = true;
    }
  };

  // Configuration de l'observateur
  const observer = new IntersectionObserver(
    handleVisibility,
    {
      threshold: 0.1,
      rootMargin: '-10% 0% -10% 0%',
    }
  );
  
  // Observer chaque image de projet
  projectPicturesRefs.current.forEach(ref => {
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
