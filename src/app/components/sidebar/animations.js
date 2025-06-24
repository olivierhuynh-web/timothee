import gsap from 'gsap';

export function enlarge(el) {
  gsap.to(el, {
    height: '100%', // Prend tout l'espace restant du flex
    duration: 0.5,
    backgroundColor: 'green',
  });
}
