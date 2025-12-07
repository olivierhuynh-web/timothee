'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './page.module.scss';
import Hero from './components/main/hero/hero';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Articles from './components/articles/articles';
import { RefsProvider, useRefs } from './animations/context';
import { useProjectsListScroll } from './animations/hooks/useProjectsListScroll';
import { useClickStickers } from './animations/hooks/useClickStickers';
import effectsOnLinkClick from './animations/effectsOnLinkClick';

function HomeContent() {
  const {
    mainRef,
    sidebarRef,
    wrapperRef,
    articlesRef,
    handleMainClick,
    handleSidebarClick,
    projectPicturesRefs,
    projectsListRef,
    database,
    setVisibleProjectIndex,
  } = useRefs();

  const { distributeStickers } = effectsOnLinkClick();
  const [animatedStickers, setAnimatedStickers] = useState([]);
  const overlayRef = useRef(null);
  const pendingLinkRef = useRef(null);

  // Hooks pour les stickers au clic par section
  const { clickStickers: mainClickStickers } = useClickStickers(mainRef, 'main');
  const { clickStickers: sidebarClickStickers } = useClickStickers(sidebarRef, 'sidebar');
  const { clickStickers: articlesClickStickers } = useClickStickers(articlesRef, 'articles');

  // Activer l'effet de scroll pour les projets
  useProjectsListScroll(
    projectPicturesRefs,
    projectsListRef,
    database,
    setVisibleProjectIndex
  );

  // Fonction pour ajouter des stickers (appelée depuis Sidebar)
  const handleAddStickers = (width, height, linkUrl) => {
    const positioned = distributeStickers(width, height, 27);

    const stickersWithTimestamp = positioned.map((sticker, index) => ({
      ...sticker,
      uniqueId: `${Date.now()}-${index}`,
    }));

    // Stocke l'URL du lien pour l'ouvrir après l'animation
    pendingLinkRef.current = linkUrl;

    setAnimatedStickers((prev) => [...prev, ...stickersWithTimestamp]);
  };

  // Anime l'apparition des stickers
  useEffect(() => {
    if (animatedStickers.length > 0 && overlayRef.current) {
      const newStickers = Array.from(
        overlayRef.current.querySelectorAll(
          `.${styles.animatedSticker}:not([data-animated="true"])`
        )
      );

      if (newStickers.length > 0) {
        newStickers.forEach((sticker) => {
          sticker.setAttribute('data-animated', 'true');
        });

        gsap.fromTo(
          newStickers,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
            stagger: 0.5 / 27, // Environ 0.0185s entre chaque pour finir en 0.5s
            onComplete: () => {
              // Ouvre le lien à la fin de l'animation
              if (pendingLinkRef.current) {
                const url = pendingLinkRef.current;

                // Ouvre Instagram dans un nouvel onglet, les autres dans le même onglet
                if (url.includes('instagram')) {
                  window.open(url, '_blank');
                } else {
                  window.location.href = url;
                }

                pendingLinkRef.current = null;
              }

              // Supprime tous les stickers après 2 secondes
              setTimeout(() => {
                setAnimatedStickers([]);
              }, 2000);
            },
          }
        );
      }
    }
  }, [animatedStickers]);

  return (
    <div className={styles.page}>
      <div className={styles.overlay} ref={overlayRef}>
        {/* Stickers animés au clic */}
        {animatedStickers.map((sticker) => (
          <div
            key={sticker.uniqueId}
            className={styles.animatedSticker}
            style={{
              position: 'absolute',
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
              zIndex: sticker.zIndex + 100,
              width: '100px',
              height: '100px',
              pointerEvents: 'none',
            }}
          >
            <Image
              src={sticker.src}
              alt='Animated sticker'
              width={100}
              height={100}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div ref={mainRef} className={styles.main}>
          <Main clickStickers={mainClickStickers} />
        </div>
        <div ref={sidebarRef} className={styles.sidebar}>
          <Sidebar onLinkClick={handleAddStickers} clickStickers={sidebarClickStickers} />
        </div>
        <div ref={articlesRef} className={styles.articles}>
          <Articles clickStickers={articlesClickStickers} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <RefsProvider>
      <HomeContent />
    </RefsProvider>
  );
}
