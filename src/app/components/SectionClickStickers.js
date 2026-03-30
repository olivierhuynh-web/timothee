'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './SectionClickStickers.module.scss';

const CLICK_STICKER_SIZE = 125;

const SectionClickStickers = ({ clickStickers }) => {
  const overlayRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100%');

  useEffect(() => {
    const updateHeight = () => {
      if (overlayRef.current && overlayRef.current.parentElement) {
        const parent = overlayRef.current.parentElement;
        const scrollHeight = parent.scrollHeight;
        setContainerHeight(`${scrollHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

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

  useEffect(() => {
    if (clickStickers.length === 0 || !overlayRef.current) {
      return;
    }

    const newClickStickers = Array.from(
      overlayRef.current.querySelectorAll(
        `.${styles.clickSticker}:not([data-animated="true"])`
      )
    );

    if (newClickStickers.length === 0) {
      return;
    }

    newClickStickers.forEach((sticker) => {
      sticker.setAttribute('data-animated', 'true');

      gsap.fromTo(
        sticker,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
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
            width: `${CLICK_STICKER_SIZE}px`,
            height: `${CLICK_STICKER_SIZE}px`,
            pointerEvents: 'none',
          }}
        >
          <Image
            src={sticker.src}
            alt='Click sticker'
            width={CLICK_STICKER_SIZE}
            height={CLICK_STICKER_SIZE}
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
