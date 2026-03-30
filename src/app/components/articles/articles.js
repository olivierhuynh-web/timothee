import styles from './articles.module.scss';
import ArticlesMenu from './articlesMenu/articlesMenu';
import { useRefs } from '../../animations/context';
import SectionClickStickers from '../SectionClickStickers';
import ArticleProjectView from './ArticleProjectView';
import { useArticleGallery } from './useArticleGallery';

function ArticlesFrame({ children, clickStickers }) {
  return (
    <div className={styles.articles}>
      <SectionClickStickers clickStickers={clickStickers} />
      <div className={styles.articles__container}>{children}</div>
      <div className={styles.articles__background}></div>
      <div className={styles.articles__foreground}></div>
      <ArticlesMenu />
    </div>
  );
}

const Articles = ({ clickStickers = [] }) => {
  const { openedProject, database, isLoading } = useRefs();
  const projects = database.projects || [];
  const {
    project,
    currentImage,
    cursorDirection,
    handleMouseMove,
    handleImageClick,
  } = useArticleGallery(projects, openedProject);

  if (isLoading || projects.length === 0) {
    return (
      <ArticlesFrame clickStickers={clickStickers} />
    );
  }

  if (!project || !currentImage) {
    return (
      <ArticlesFrame clickStickers={clickStickers} />
    );
  }

  return (
    <ArticlesFrame clickStickers={clickStickers}>
      <ArticleProjectView
        currentImage={currentImage}
        cursorDirection={cursorDirection}
        handleImageClick={handleImageClick}
        handleMouseMove={handleMouseMove}
      />
    </ArticlesFrame>
  );
};

export default Articles;
