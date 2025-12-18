'use client';
import React, { useRef, useEffect } from 'react';
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
          width={600}
          height={300}
          style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
          priority
          className={styles.hero__container__welcomeImage}
          // ref={welcomeImageRef}
        />
      </div>
    </>
  );
};

export default Hero;
