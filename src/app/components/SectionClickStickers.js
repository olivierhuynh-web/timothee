'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './SectionClickStickers.module.scss';

const SectionClickStickers = ({ clickStickers }) => {
  const overlayRef = useRef(null);

  // Anime l'apparition des stickers au clic
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
        });

        gsap.fromTo(
          newClickStickers,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          }
        );
      }
    }
  }, [clickStickers]);

  return (
    <div ref={overlayRef} className={styles.sectionOverlay}>
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
