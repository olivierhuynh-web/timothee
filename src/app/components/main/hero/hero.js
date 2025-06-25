'use client';
import React, { use } from 'react';
import Image from 'next/image';
import styles from './hero.module.scss';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { heroAnimations } from './animations';

const hero = () => {
  const welcomeImageRef = useRef(null);
  const magazineImageRef = useRef(null);
  const containerRef = useRef(null);
  const elementForScroll = useRef(null);

  // ==================== USELAYOUTEFFECT ====================
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  // ==================== USESTATE ====================

  const [timeline, setTimeline] = useState(null);
  // ==================== TIMELINE GSAP ====================

  useIsomorphicLayoutEffect(() => {
    let context = gsap.context(() => {
      const tl = gsap.timeline();
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  // ==================== USEEFFECT ANIMATION ====================

  // animation d'entrée dans la sidebar
  useEffect(() => {
    const context = gsap.context(() => {
      heroAnimations(welcomeImageRef, magazineImageRef);
    });

    return () => context.revert();
  }, [timeline]);

  return (
    <>
      {/* <div className={styles.elementForScroll} ref={elementForScroll}></div> */}
      <div className={styles.hero__container} ref={containerRef}>
        <Image
          src='/images/welcome.png'
          alt='Image de bienvenue'
          width={600}
          height={300}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          priority
          ref={welcomeImageRef}
        />
        <Image
          src='/images/magazine.png'
          alt='Image de magazine'
          width={600}
          height={300}
          style={{ width: '25%', height: 'auto', objectFit: 'contain' }}
          priority
          className={styles.hero__container__magazineImage}
          ref={magazineImageRef}
        />
      </div>
    </>
  );
};

export default hero;
