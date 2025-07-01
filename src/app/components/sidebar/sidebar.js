'use client';
import React from 'react';
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import styles from './sidebar.module.scss';
import { gsap } from 'gsap';
import Image from 'next/image';

import { enlarge } from './animations';

// ==================== USELAYOUTEFFECT ====================
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const sidebar = () => {
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
      // if (bottomRef.current) {
      //   enlarge(bottomRef.current);
      // }
    });

    return () => context.revert();
  }, [timeline]);

  // ==================== USEREFS ====================

  const bottomRef = useRef(null);

  return (
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__container__header}>Header</div>
      <hr className={styles.sidebar__container__separator} />

      <div ref={bottomRef} className={styles.sidebar__container__bottom}>
        <div className={styles.sidebar__container__bottom__container}>
          <div className={styles.sidebar__container__bottom__container__paper}>
            <p>
              TC développe une pratique ouverte de l’édition qui se laisse
              volontiers traverser par d’autres champs de l’art plastique tels
              que la peinture, le dessin, le textile et l’installation.
            </p>
            <Image
              src='/images/smile.png'
              alt='Image de présentation de Timothée Casilli'
              width={600}
              height={300}
              style={{ width: 'auto', height: '60%', objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
