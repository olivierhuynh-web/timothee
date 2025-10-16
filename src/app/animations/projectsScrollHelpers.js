/**
 * Constantes pour la configuration du scroll des projets
 */
const VISIBILITY_THRESHOLD = 0.3; // 30% de la hauteur de l'écran
const REMOVE_THRESHOLD = 0.1; // 10% du haut de l'écran
const ANIMATION_DURATION = 300; // ms

/**
 * Vérifie si un projet est visible dans le viewport
 */
export function isProjectVisible(ref) {
  if (!ref) return false;

  const rect = ref.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight * (1 - VISIBILITY_THRESHOLD) &&
    rect.bottom >= window.innerHeight * VISIBILITY_THRESHOLD
  );
}

/**
 * Trouve l'index du projet le plus haut actuellement visible
 */
export function findHighestVisibleProjectIndex(projectPicturesRefs) {
  let highestVisibleIndex = -1;

  for (let i = 0; i < projectPicturesRefs.current.length; i++) {
    const ref = projectPicturesRefs.current[i];
    if (isProjectVisible(ref)) {
      highestVisibleIndex = i;
    }
  }

  return highestVisibleIndex;
}

/**
 * Crée un élément DOM pour une ligne de projet
 */
export function createProjectLine(project, index) {
  const line = document.createElement('div');
  line.className = 'project-line';
  line.textContent = project.name;
  line.style.opacity = '0';
  line.style.transform = 'translateY(10px)';
  line.style.transition = 'all 0.3s ease';
  line.dataset.projectIndex = index;
  line.classList.add('appearing');

  return line;
}

/**
 * Met à jour les styles des lignes de projet pour mettre en évidence la dernière
 */
export function updateProjectStyles(projectsListRef) {
  if (!projectsListRef.current) return;

  const projectLines = Array.from(projectsListRef.current.children);
  const total = projectLines.length;

  projectLines.forEach((line, i) => {
    const isLast = i === total - 1;
    line.style.opacity = '1';
    line.style.color = isLast ? 'var(--text-primary)' : 'var(--text-secondary)';
  });
}

/**
 * Vérifie si un projet devrait être retiré lors du scroll vers le haut
 */
export function shouldRemoveProject(ref, highestVisibleIndex, projectIndex) {
  if (!ref) return false;

  const rect = ref.getBoundingClientRect();
  const isBelowViewport = rect.top > window.innerHeight * REMOVE_THRESHOLD;

  return projectIndex > highestVisibleIndex && isBelowViewport;
}

/**
 * Crée le gestionnaire de scroll avec debounce
 */
export function createScrollHandler(handleVisibility) {
  let ticking = false;

  return () => {
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
}

export { ANIMATION_DURATION };
