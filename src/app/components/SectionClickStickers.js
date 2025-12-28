'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './SectionClickStickers.module.scss';

const SectionClickStickers = ({ clickStickers }) => {
  const overlayRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100%');

  // Calcule dynamiquement la hauteur du conteneur parent scrollable
  useEffect(() => {
    const updateHeight = () => {
      if (overlayRef.current && overlayRef.current.parentElement) {
        const parent = overlayRef.current.parentElement;
        const scrollHeight = parent.scrollHeight;
        setContainerHeight(`${scrollHeight}px`);
      }
    };

    // Mise à jour initiale
    updateHeight();

    // Mise à jour lors du resize de la fenêtre
    window.addEventListener('resize', updateHeight);

    // Observer les changements de DOM pour détecter les modifications de contenu
    const observer = new MutationObserver(updateHeight);
    if (overlayRef.current && overlayRef.current.parentElement) {
      observer.observe(overlayRef.current.parentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  // Anime l'apparition des stickers au clic et leur disparition après 2s
  useEffect(() => {
    if (clickStickers.length > 0 && overlayRef.current) {
      const newClickStickers = Array.from(
        overlayRef.current.querySelectorAll(
          `.${styles.clickSticker}:not([data-animated="true"])`
        )
      );

      if (newClickStickers.length > 0) {
        newClickStickers.forEach((sticker) => {
          sticker.setAttribute('data-animated', 'true');

          // Animation d'apparition
          gsap.fromTo(
            sticker,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(1.7)',
              // Après 2 secondes, anime la disparition
              onComplete: () => {
                setTimeout(() => {
                  gsap.to(sticker, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }, 2000);
              },
            }
          );
        });
      }
    }
  }, [clickStickers]);

  return (
    <div
      ref={overlayRef}
      className={styles.sectionOverlay}
      style={{ height: containerHeight }}
    >
      {clickStickers.map((sticker) => (
        <div
          key={sticker.id}
          className={styles.clickSticker}
          style={{
            position: 'absolute',
            left: `${sticker.x}px`,
            top: `${sticker.y}px`,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            zIndex: 200,
            width: '100px',
            height: '100px',
            pointerEvents: 'none',
          }}
        >
          <Image
            src={sticker.src}
            alt='Click sticker'
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
  );
};

export default SectionClickStickers;
