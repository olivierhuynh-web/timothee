'use client';

import Image from 'next/image';
import styles from '../page.module.scss';

const OVERLAY_STICKER_SIZE = 100;

export default function AnimatedStickersOverlay({
  animatedStickers,
  overlayRef,
}) {
  return (
    <div className={styles.overlay} ref={overlayRef}>
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
            width: `${OVERLAY_STICKER_SIZE}px`,
            height: `${OVERLAY_STICKER_SIZE}px`,
            pointerEvents: 'none',
          }}
        >
          <Image
            src={sticker.src}
            alt='Animated sticker'
            width={OVERLAY_STICKER_SIZE}
            height={OVERLAY_STICKER_SIZE}
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
}
