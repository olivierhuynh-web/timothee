'use client';
import { useRef } from 'react';
import styles from './sidebar.module.scss';
import Stickers from '../main/stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';

const Sidebar = ({ onLinkClick, clickStickers }) => {
  const bottomRef = useRef(null);

  // Gestionnaire de clic pour les liens
  const handleLinkClick = (e) => {
    e.preventDefault();

    // Récupère l'URL du lien
    const linkUrl = e.currentTarget.href;

    // Récupère les dimensions de la page entière
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Appelle la fonction parent pour ajouter des stickers et passe l'URL
    if (onLinkClick) {
      onLinkClick(width, height, linkUrl);
    }
  };

  return (
    <div className={styles.sidebar__container}>
      {/* <Stickers count={8} /> */}
      <SectionClickStickers clickStickers={clickStickers} />

      <div className={styles.sidebar__container__header}>
        <div className={styles.sidebar__container__header__firstline}>
          <span>Timothée Casilli</span>
          <div
            className={
              styles.sidebar__container__header__firstline__seconditems
            }
          >
            <div>Paris, France</div>
            <div>
              <a href='mailto:timotheeclp@gmail.com' onClick={handleLinkClick}>
                timotheeclp@gmail.com
              </a>
            </div>
          </div>
          <div
            className={styles.sidebar__container__header__firstline__thirditems}
          >
            <div>
              <a
                href='https://www.instagram.com/timothee.casilli/'
                onClick={handleLinkClick}
              >
                Instagram
              </a>
            </div>
            <div>CV</div>
          </div>
        </div>
      </div>

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
              au point de tension qui amène une lecture vers la suivante. Il a
              coeur de faire dialoguer cette aspiration artistique avec sa
              pratique concrète du graphisme, en nourrissant ces deux parties
              l'une avec l'autre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
