'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Hero from './components/main/hero/hero';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Articles from './components/articles/articles';
import { gsap } from 'gsap';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const wrapperRef = useRef(null);
  const articlesRef = useRef(null);

  const [isMainOpen, setIsMainOpen] = useState(true);

  const handleMainClick = () => {
    gsap.to(wrapperRef.current, {
      x: '-60vw',
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(articlesRef.current, {
      width: '60vw',
      duration: 0.5,
      ease: 'power2.out',
    });

    setIsMainOpen(false);
  };

  const handleSidebarClick = () => {
    gsap.to(wrapperRef.current, {
      x: '0%',
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(articlesRef.current, {
      width: '0%',
      duration: 0.5,
      ease: 'power2.out',
    });
    setIsMainOpen(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div onClick={handleMainClick} ref={mainRef} className={styles.main}>
          <Main />
        </div>
        <div
          onClick={handleSidebarClick}
          ref={sidebarRef}
          className={styles.sidebar}
        >
          <Sidebar />
        </div>
        <div ref={articlesRef} className={styles.articles}>
          <Articles />
        </div>
      </div>
    </div>
  );
}
