// Centralisation des animations GSAP
import { gsap } from 'gsap';
import React, { createContext, useContext, useRef, useState } from 'react';

// CONTEXTE DES REFS + ÉTAT GLOBAL + HANDLERS
const RefsContext = createContext(null);

export function RefsProvider({ children }) {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const wrapperRef = useRef(null);
  const articlesRef = useRef(null);
  const indexButtonRef = useRef(null);
  const sidebarHeaderRef = useRef(null);

  // Ajout de l'état global ici
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isFlexStart, setIsFlexStart] = useState(false);

  // Fonction pour alterner l'alignement
  const toggleAlignment = () => {
    setIsFlexStart((prev) => !prev);
  };

  // Handlers centralisés
  const handleMainClick = () => {
    animateMainOpen(wrapperRef, articlesRef);
    toggleAlignment();
    setIsMainOpen(false);
  };

  const handleSidebarClick = () => {
    if (!isMainOpen) {
      toggleAlignment();
      animateSidebarOpen(wrapperRef, articlesRef);
      setIsMainOpen(true);
    } else {
      // il faudra ajouter le lien pour aller à l'index
      // ou faire lien directement inline
    }
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
        setIsMainOpen,
        isFlexStart,
        toggleAlignment,
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

// export function transformIndexToReturn(sidebarHeaderRef) {
//   if (sidebarHeaderRef.current) {
//     gsap.to(sidebarHeaderRef.current, {
//       x: '0px', // Animation de translation (facultative)
//       duration: 0.5,
//       ease: 'power2.out',
//       onComplete: () => {
//         // Modifier justify-content après l'animation
//         sidebarHeaderRef.current.style.justifyContent = 'flex-start';
//         console.log('justify-content modifié à flex-start');
//         console.log(
//           'Valeur actuelle de justify-content :',
//           getComputedStyle(sidebarHeaderRef.current).justifyContent
//         );
//       },
//     });
//   } else {
//     console.error('Référence sidebarHeaderRef non définie');
//   }
// }
