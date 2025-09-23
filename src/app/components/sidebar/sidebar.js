'use client';
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import database from '../../db/database.json';
import { useRefs } from '../../animations/context';
import { gsap } from 'gsap';

const Sidebar = () => {
  const {
    isMainOpen,
    handleSidebarClick,
    indexButtonRef,
    // projectsListRef,
    // projectsListScrollEffect,
  } = useRefs();
  const bottomRef = useRef(null);

  // ==================== USELAYOUTEFFECT ====================
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  // ==================== USESTATE ====================

  // const [timeline, setTimeline] = useState(null);

  // ==================== TIMELINE GSAP ====================

  // useIsomorphicLayoutEffect(() => {
  //   let context = gsap.context(() => {
  //     const tl = gsap.timeline();
  //     setTimeline(tl);
  //   });

  //   return () => context.revert();
  // }, []);

  // ==================== USEEFFECT ANIMATION ====================

  // animation d'entrée dans la sidebar
  // useEffect(() => {
  //   const context = gsap.context(() => {
  //     // projectsListScrollEffect()
  //   });

  //   return () => context.revert();
  // }, [timeline]);

  return (
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__container__header}>
        {/* <button
          className={styles.sidebar__container__header__button}
          onClick={handleSidebarClick}
          ref={indexButtonRef}
        >
          {isMainOpen ? 'Index' : 'Retour'}
        </button> */}
        <div className={styles.sidebar__container__header__firstline}>
          <span>Timothée Casilli</span>
          <div
            className={
              styles.sidebar__container__header__firstline__seconditems
            }
          >
            <div>Paris, France</div>
            <div>timotheeclp@gmail.com</div>
          </div>
          <div
            className={styles.sidebar__container__header__firstline__thirditems}
          >
            <div>Instagram</div>
            <div>CV</div>
          </div>{' '}
        </div>
        {/* Paris, France timotheeclp@gmail.com Instagram CV */}
      </div>

      {/* <div ref={projectsListRef}></div> */}
      {/* <hr className={styles.sidebar__container__separator} /> */}
      <div ref={bottomRef} className={styles.sidebar__container__bottom}>
        <div className={styles.sidebar__container__bottom__container}>
          <div className={styles.sidebar__container__bottom__container__paper}>
            <p>
              TC développe une pratique ouverte de l’édition qui se laisse
              volontiers traverser par d’autres champs de l’art plastique tels
              que la peinture, le dessin, le textile et l’installation. Il
              travaille avec des textes de natures parfois très différentes pour
              leur trouver un fil narratif commun travers l’expérience de
              lecture par laquelle il les présente. Son travail commence souvent
              au point de tension qui amène une lec- ture vers la suivante. Il a
              coeur de faire dialoguer cette aspiration artistique avec sa
              pratique concrète du graphisme, en nourrissant ces deux parties
              l’une avec l’autre.
            </p>
            {/* <Image
              src='/images/smile.png'
              alt='Image de présentation de Timothée Casilli'
              width={600}
              height={300}
              style={{ width: 'auto', height: '60%', objectFit: 'contain' }}
              priority
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
