'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './sidebar.module.scss';
import database from '../../db/database.json';
import { useRefs } from '../../animations/context';

const Sidebar = () => {
  const { isFlexStart, handleSidebarClick } = useRefs();
  const bottomRef = useRef(null);

  return (
    <div className={styles.sidebar__container}>
      <motion.div
        className={styles.sidebar__container__header}
        animate={{
          justifyContent: isFlexStart ? 'flex-start' : 'flex-end', // Change justify-content
        }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <motion.button
          className={styles.sidebar__container__header__button}
          onClick={handleSidebarClick} // Alterne l'alignement
          // animate={{
          //   scale: 1,
          // }}
        >
          {isFlexStart ? 'Retour' : 'Index'}
        </motion.button>
      </motion.div>{' '}
      <h2>{database.projects[0].name}</h2>
      <hr className={styles.sidebar__container__separator} />
      <div ref={bottomRef} className={styles.sidebar__container__bottom}>
        <div className={styles.sidebar__container__bottom__container}>
          <div className={styles.sidebar__container__bottom__container__paper}>
            <p>
              TC développe une pratique ouverte de l’édition qui se laisse
              volontiers traverser par d’autres champs de l’art plastique tels
              que la peinture, le dessin, le textile et l’installation.
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
