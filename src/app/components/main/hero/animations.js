import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const heroAnimations = (welcomeImageRef, magazineImageRef) => {
  // Animation pour l'image de bienvenue
  if (welcomeImageRef?.current) {
    gsap.fromTo(
      welcomeImageRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: welcomeImageRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );
  }

  // Animation pour l'image du magazine
  if (magazineImageRef?.current) {
    gsap.fromTo(
      magazineImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: magazineImageRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );
  }
};
