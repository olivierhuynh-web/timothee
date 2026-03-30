'use client';
import styles from './sidebar.module.scss';
import SectionClickStickers from '../SectionClickStickers';
import { DEFAULT_DESCRIPTION } from './sidebarContent';
import { useAnimatedDescription } from './useAnimatedDescription';

const Sidebar = ({ onLinkClick, clickStickers, projectDescription }) => {
  const descriptionRef = useAnimatedDescription(
    projectDescription || DEFAULT_DESCRIPTION
  );

  const handleLinkClick = (e) => {
    e.preventDefault();

    if (onLinkClick) {
      onLinkClick(window.innerWidth, window.innerHeight, e.currentTarget.href);
    }
  };

  return (
    <div className={styles.sidebar__container}>
      <SectionClickStickers clickStickers={clickStickers} />

      <div className={styles.sidebar__container__header}>
        <div className={styles.sidebar__container__header__firstline}>
          <span data-no-sticker>Timothée Casilli</span>
          <div
            className={
              styles.sidebar__container__header__firstline__seconditems
            }
          >
            <div data-no-sticker>Paris, France</div>
            <div>
              <a href='mailto:timotheeclp@gmail.com' onClick={handleLinkClick}>
                timotheeclp@gmail.com
              </a>
            </div>
          </div>
          <div
            className={styles.sidebar__container__header__firstline__thirditems}
          >
            <div>
              <a
                href='https://www.instagram.com/timothee.casilli/'
                onClick={handleLinkClick}
                data-no-sticker
              >
                Instagram
              </a>
            </div>
            <div>CV</div>
          </div>
        </div>
      </div>

      <div className={styles.sidebar__container__bottom}>
        <div className={styles.sidebar__container__bottom__container}>
          <div className={styles.sidebar__container__bottom__container__paper}>
            <p ref={descriptionRef}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
