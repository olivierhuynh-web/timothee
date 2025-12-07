import { useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * Hook custom pour gérer les animations de slide entre Main et Articles
 * @param {Object} wrapperRef - Ref du wrapper principal
 * @param {Object} articlesRef - Ref de la section Articles
 * @returns {Object} Fonctions slideRight et slideLeft
 */
export function useSectionSlider(wrapperRef, articlesRef) {
  /**
   * Fait glisser l'écran vers la droite (ouvre la section Articles)
   */
  const slideRight = useCallback(() => {
    if (!wrapperRef.current || !articlesRef.current) return;

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
  }, [wrapperRef, articlesRef]);

  /**
   * Fait glisser l'écran vers la gauche (ferme la section Articles)
   */
  const slideLeft = useCallback(() => {
    if (!wrapperRef.current || !articlesRef.current) return;

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
  }, [wrapperRef, articlesRef]);

  return { slideRight, slideLeft };
}
