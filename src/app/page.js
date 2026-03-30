'use client';
import styles from './page.module.scss';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Articles from './components/articles/articles';
import AnimatedStickersOverlay from './components/AnimatedStickersOverlay';
import MobileHome from './components/mobile/MobileHome';
import { RefsProvider, useRefs } from './animations/context';
import { useProjectsListScroll } from './animations/hooks/useProjectsListScroll';
import { useAnimatedLinkStickers } from './hooks/useAnimatedLinkStickers';

function HomeContent() {
  const {
    mainRef,
    sidebarRef,
    wrapperRef,
    articlesRef,
    projectPicturesRefs,
    projectsListRef,
    database,
    setVisibleProjectIndex,
    currentProjectDescription,
    mainClickStickers,
    sidebarClickStickers,
    articlesClickStickers,
    addClickSticker,
  } = useRefs();

  const { animatedStickers, overlayRef, handleAddStickers } =
    useAnimatedLinkStickers(styles.animatedSticker);

  const handleMainStickerClick = (e) => addClickSticker(e, 'main', mainRef);
  const handleSidebarStickerClick = (e) =>
    addClickSticker(e, 'sidebar', sidebarRef);
  const handleArticlesStickerClick = (e) =>
    addClickSticker(e, 'articles', articlesRef);

  useProjectsListScroll(
    projectPicturesRefs,
    projectsListRef,
    database,
    setVisibleProjectIndex
  );

  return (
    <div className={styles.page}>
      <AnimatedStickersOverlay
        animatedStickers={animatedStickers}
        overlayRef={overlayRef}
      />

      {/* Desktop */}
      <div className={styles.desktopOnly}>
        <div className={styles.wrapper} ref={wrapperRef}>
          <div
            ref={mainRef}
            className={styles.main}
            onClick={handleMainStickerClick}
          >
            <Main clickStickers={mainClickStickers} />
          </div>
          <div
            ref={sidebarRef}
            className={styles.sidebar}
            onClick={handleSidebarStickerClick}
          >
            <Sidebar
              onLinkClick={handleAddStickers}
              clickStickers={sidebarClickStickers}
              projectDescription={currentProjectDescription}
            />
          </div>
          <div
            ref={articlesRef}
            className={styles.articles}
            onClick={handleArticlesStickerClick}
          >
            <Articles clickStickers={articlesClickStickers} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={styles.mobileOnly}>
        <MobileHome onLinkClick={handleAddStickers} />
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
