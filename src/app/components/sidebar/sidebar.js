'use client';
import React from 'react';
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import styles from './sidebar.module.scss';
import { gsap } from 'gsap';
import { enlarge } from './animations';

// ==================== USELAYOUTEFFECT ====================
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const sidebar = () => {
  // ==================== USESTATE ====================

  const [timeline, setTimeline] = useState(null);
  const bottomRef = useRef(null);
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
      if (bottomRef.current) {
        enlarge(bottomRef.current);
      }
    });

    return () => context.revert();
  }, [timeline]);

  // ==================== USEREFS ====================

  return (
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__container__header}>Header</div>
      <div ref={bottomRef} className={styles.sidebar__container__bottom}>
        Bottom
      </div>
    </div>
  );
};

export default sidebar;
