import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Hook custom pour gérer l'animation du menu Articles
 * @param {Object} articlesMenuRef - Ref du menu Articles
 * @param {boolean} isMainOpen - État indiquant si la section Main est ouverte
 */
export function useArticlesMenuAnimation(articlesMenuRef, isMainOpen) {
  useEffect(() => {
    if (!articlesMenuRef.current) return;

    // Le menu apparaît quand isMainOpen est false (inversé)
    const show = !isMainOpen;

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
  }, [articlesMenuRef, isMainOpen]);
}
