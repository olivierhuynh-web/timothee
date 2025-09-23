'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Hero from './components/main/hero/hero';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Articles from './components/articles/articles';
import { RefsProvider, useRefs, useProjectsScrollEffect } from './animations/context';

function HomeContent() {
  const {
    mainRef,
    sidebarRef,
    wrapperRef,
    articlesRef,
    handleMainClick,
    handleSidebarClick,
  } = useRefs();
  
  // Activer l'effet de scroll pour les projets
  useProjectsScrollEffect();
  return (
    <div className={styles.page}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div ref={mainRef} className={styles.main}>
          <Main />
        </div>
        <div ref={sidebarRef} className={styles.sidebar}>
          <Sidebar />
        </div>
        <div ref={articlesRef} className={styles.articles}>
          <Articles />
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
