'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import effectsOnLinkClick from '../animations/effectsOnLinkClick';

export function useAnimatedLinkStickers(animatedStickerClassName) {
  const { distributeStickers } = effectsOnLinkClick();
  const [animatedStickers, setAnimatedStickers] = useState([]);
  const overlayRef = useRef(null);
  const pendingLinkRef = useRef(null);

  const handleAddStickers = (width, height, linkUrl) => {
    const positioned = distributeStickers(width, height, 27);
    const stickersWithTimestamp = positioned.map((sticker, index) => ({
      ...sticker,
      uniqueId: `${Date.now()}-${index}`,
    }));

    pendingLinkRef.current = linkUrl;
    setAnimatedStickers((prev) => [...prev, ...stickersWithTimestamp]);
  };

  useEffect(() => {
    if (animatedStickers.length === 0 || !overlayRef.current) {
      return;
    }

    const newStickers = Array.from(
      overlayRef.current.querySelectorAll(
        `.${animatedStickerClassName}:not([data-animated="true"])`
      )
    );

    if (newStickers.length === 0) {
      return;
    }

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
        stagger: 0.5 / 27,
        onComplete: () => {
          if (pendingLinkRef.current) {
            const url = pendingLinkRef.current;

            if (url.includes('instagram')) {
              window.open(url, '_blank');
            } else {
              window.location.href = url;
            }

            pendingLinkRef.current = null;
          }

          setTimeout(() => {
            setAnimatedStickers([]);
          }, 2000);
        },
      }
    );
  }, [animatedStickerClassName, animatedStickers]);

  return {
    animatedStickers,
    overlayRef,
    handleAddStickers,
  };
}
