import { useEffect } from 'react';
import { projectImagesScrollAnimation } from '../animations';
import { cleanupScrollTriggers } from '../animations';

/**
 * Hook custom pour gérer l'animation des images de projets au scroll
 * @param {Object} projectPicturesRefs - Ref contenant le tableau des images
 * @param {Object} projectsInMainRef - Ref de la section projectsInMain
 * @param {Object} placeholderRef - Ref de l'image placeholder
 */
export function useProjectImagesAnimation(
  projectPicturesRefs,
  projectsInMainRef,
  placeholderRef
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      projectImagesScrollAnimation(
        projectPicturesRefs,
        projectsInMainRef,
        placeholderRef
      );
    }, 300);

    return () => {
      clearTimeout(timer);
      cleanupScrollTriggers();
    };
  }, [projectPicturesRefs, projectsInMainRef, placeholderRef]);
}
