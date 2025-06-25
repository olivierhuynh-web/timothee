import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function enlarge(el) {
  gsap.to(el, {
    height: '100%', // Prend tout l'espace restant du flex
    duration: 0.5,
    backgroundColor: 'green',
  });
}

// Animation de la sidebar au scroll du main
export function animateSidebarOnScroll(mainScrollEl, sidebarEl) {
  if (!mainScrollEl || !sidebarEl) return;
  gsap.to(sidebarEl, {
    backgroundColor: '#e0e0e0', // Exemple : change la couleur de la sidebar au scroll
    scrollTrigger: {
      trigger: mainScrollEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      scroller: mainScrollEl, // écoute le scroll du main
    },
  });
}
