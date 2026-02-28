'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './sidebar.module.scss';
import Stickers from '../main/stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';

const Sidebar = ({ onLinkClick, clickStickers, projectDescription }) => {
  const bottomRef = useRef(null);
  const descriptionRef = useRef(null);

  const defaultDescription = `TC développe une pratique ouverte de l'édition qui se laisse volontiers traverser par d'autres champs de l'art plastique tels que la peinture, le dessin, le textile et l'installation. Il travaille avec des textes de natures parfois très différentes pour leur trouver un fil narratif commun travers l'expérience de lecture par laquelle il les présente. Son travail commence souvent au point de tension qui amène une lecture vers la suivante. Il a coeur de faire dialoguer cette aspiration artistique avec sa pratique concrète du graphisme, en nourrissant ces deux parties l'une avec l'autre.`;

  // Fonction pour splitter le texte en mots et animer
  const splitAndAnimate = (el, text) => {
    if (!el) return;

    // Divise le texte en mots
    const words = text.split(/\s+/).filter(word => word.length > 0);

    // Crée les spans pour chaque mot
    el.innerHTML = words
      .map((word) => `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(15px);">${word}</span>`)
      .join(' ');

    // Récupère les spans
    const wordSpans = el.querySelectorAll('.word');

    // Anime avec GSAP
    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.out',
    });
  };

  // Animation de la description (initiale + changements)
  useEffect(() => {
    const text = projectDescription || defaultDescription;
    if (descriptionRef.current) {
      splitAndAnimate(descriptionRef.current, text);
    }
  }, [projectDescription, defaultDescription]);

  // Gestionnaire de clic pour les liens
  const handleLinkClick = (e) => {
    e.preventDefault();
    const linkUrl = e.currentTarget.href;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (onLinkClick) {
      onLinkClick(width, height, linkUrl);
    }
  };

  return (
    <div className={styles.sidebar__container}>
      <SectionClickStickers clickStickers={clickStickers} />

      <div className={styles.sidebar__container__header}>
        <div className={styles.sidebar__container__header__firstline}>
          <span data-no-sticker>Timothée Casilli</span>
          <div
            className={
              styles.sidebar__container__header__firstline__seconditems
            }
          >
            <div data-no-sticker>Paris, France</div>
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
                data-no-sticker
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
            <p ref={descriptionRef}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
