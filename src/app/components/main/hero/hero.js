'use client';
import Image from 'next/image';
import styles from './hero.module.scss';

const HERO_IMAGES = [
  {
    src: '/images/herisson.png',
    alt: 'Image de bienvenue',
    width: '37%',
    className: styles.hero__container__welcomeImage,
  },
  {
    src: '/images/face.jpeg',
    alt: 'Image de bienvenue',
    width: '30%',
    className: styles.hero__container__secondImage,
  },
];

const Hero = () => {
  return (
    <div className={styles.hero__container}>
      {HERO_IMAGES.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={1200}
          height={1200}
          quality={90}
          priority
          className={image.className}
          style={{ width: image.width, height: 'auto', objectFit: 'contain' }}
        />
      ))}
    </div>
  );
};

export default Hero;
