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
  // Le conteneur est visible dès qu'il entre dans le viewport
  return (
    rect.top < window.innerHeight && // Le haut est visible (en dessous du haut de l'écran)
    rect.bottom > 0 // Le bas est visible (au-dessus du bas de l'écran)
  );
}

/**
 * Trouve l'index du projet le plus haut actuellement visible
 * Un projet est considéré comme "visible" si son centre est dans le viewport
 */
export function findHighestVisibleProjectIndex(projectPicturesRefs) {
  let highestVisibleIndex = -1;

  for (let i = 0; i < projectPicturesRefs.current.length; i++) {
    const ref = projectPicturesRefs.current[i];
    if (!ref) continue;

    const rect = ref.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    // Le centre du projet doit être dans le viewport
    const isCenterInViewport = centerY >= 0 && centerY <= window.innerHeight;

    if (isCenterInViewport) {
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
  line.style.transition = 'opacity 0.3s ease';
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

    // Si la ligne vient d'être ajoutée (classe 'appearing')
    if (line.classList.contains('appearing')) {
      // Utiliser setTimeout pour permettre au navigateur de peindre l'état initial
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.color = isLast ? 'var(--text-primary)' : 'var(--text-secondary)';
        line.classList.remove('appearing');
      }, 10);
    } else {
      // Pour les lignes déjà affichées, juste mettre à jour la couleur
      line.style.color = isLast ? 'var(--text-primary)' : 'var(--text-secondary)';
    }
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
