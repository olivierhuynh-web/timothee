import { useEffect } from 'react';
import {
  createProjectLine,
  updateProjectStyles as updateStyles,
  findHighestVisibleProjectIndex,
  shouldRemoveProject,
  createScrollHandler,
  ANIMATION_DURATION,
} from '../projectsScrollHelpers';

/**
 * Effet de scroll pour la liste des projets
 * Gère l'affichage dynamique des titres de projets lors du scroll
 */
function projectsListScrollEffect(
  projectPicturesRefs,
  projectsListRef,
  database,
  setVisibleProjectIndex
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
    const highestVisibleIndex =
      findHighestVisibleProjectIndex(projectPicturesRefs);

    // Mettre à jour le state avec l'index du projet visible (ou -1 si aucun)
    setVisibleProjectIndex(highestVisibleIndex);

    if (highestVisibleIndex !== -1) {
      // Ajouter tous les projets visibles
      for (let i = 0; i <= highestVisibleIndex; i++) {
        if (database.projects[i]) {
          addProject(i);
        }
      }
    }

    // Toujours vérifier et retirer les projets non visibles
    Array.from(displayedProjects).forEach((index) => {
      const ref = projectPicturesRefs.current[index];
      if (shouldRemoveProject(ref, highestVisibleIndex, index)) {
        removeProject(index);
      }
    });
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

/**
 * Hook personnalisé pour l'effet de scroll des projets
 * @param {Object} projectPicturesRefs - Refs des conteneurs d'images
 * @param {Object} projectsListRef - Ref de la liste des projets
 * @param {Object} database - Base de données des projets
 * @param {Function} setVisibleProjectIndex - Setter pour l'index du projet visible
 */
export function useProjectsListScroll(
  projectPicturesRefs,
  projectsListRef,
  database,
  setVisibleProjectIndex
) {
  useEffect(() => {
    // Ne pas démarrer si pas de projets
    if (!database.projects || database.projects.length === 0) {
      return;
    }

    let cleanup;

    // Attend que les refs soient prêtes (après le rendu des images)
    const timer = setTimeout(() => {
      // Vérifier que les refs sont bien remplies
      const hasRefs = projectPicturesRefs.current.some(ref => ref !== null);
      if (!hasRefs) {
        return;
      }

      cleanup = projectsListScrollEffect(
        projectPicturesRefs,
        projectsListRef,
        database,
        setVisibleProjectIndex
      );
    }, 200); // Augmenté à 200ms pour laisser le temps au rendu

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [projectPicturesRefs, projectsListRef, database, setVisibleProjectIndex]);
}
