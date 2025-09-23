import { useLayoutEffect, useEffect, useState } from 'react';
import styles from './main.module.scss';
import Hero from './hero/hero';
import ProjectsInMain from './projectsInMain/projectsInMain';
import { useRefs } from '../../animations/context';
import { gsap } from 'gsap';

const main = () => {
  const [timeline, setTimeline] = useState(null);
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    let context = gsap.context(() => {
      const tl = gsap.timeline();
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      // projectsListScrollEffect();
    });

    return () => context.revert();
  }, [timeline]);

  // On ne récupère plus projectsListRef ici
  const { handleMainClick } = useRefs();

  return (
    <div className={styles.main__container}>
      <Hero />
      {/* On retire le <div ref={projectsListRef}></div> */}
      <ProjectsInMain handleMainClick={handleMainClick} />
    </div>
  );
};

export default main;
