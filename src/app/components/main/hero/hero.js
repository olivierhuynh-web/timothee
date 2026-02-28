'use client';
import React from 'react';
import Image from 'next/image';
import styles from './hero.module.scss';
// import { gsap } from 'gsap';
// import { heroAnimations } from './animations';

const Hero = () => {
  // const welcomeImageRef = useRef(null);
  // const magazineImageRef = useRef(null);

  // useEffect(() => {
  //   const context = gsap.context(() => {
  //     heroAnimations(welcomeImageRef, magazineImageRef);
  //   });

  //   return () => context.revert();
  // }, []);

  return (
    <>
      <div className={styles.hero__container}>
        <Image
          src='/images/herisson.png'
          alt='Image de bienvenue'
          width={1200}
          height={1200}
          quality={90}
          style={{ width: '37%', height: 'auto', objectFit: 'contain' }}
          priority
          className={styles.hero__container__welcomeImage}
          // ref={welcomeImageRef}
        />

        <Image
          src='/images/face.jpeg'
          alt='Image de bienvenue'
          width={1200}
          height={1200}
          quality={90}
          style={{ width: '30%', height: 'auto', objectFit: 'contain' }}
          priority
          className={styles.hero__container__secondImage}
          // ref={welcomeImageRef}
        />
      </div>
    </>
  );
};

export default Hero;
