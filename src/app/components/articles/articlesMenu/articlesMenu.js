import { useRefs } from '../../../animations/context';
import styles from './articlesMenu.module.scss';

const ArticlesMenu = () => {
  const {
    articlesMenuRef,
    handleArticlesMenuClick,
    openedProject,
    setOpenedProject,
    database,
  } = useRefs();

  // Gère le clic sur un projet dans le menu
  const handleProjectClick = (projectId, e) => {
    e.stopPropagation();
    setOpenedProject(projectId);
  };

  return (
    <div className={styles.articlesMenu}>
      <div className={styles.articlesMenu__container} ref={articlesMenuRef}>
        <button
          onClick={handleArticlesMenuClick}
          className={styles.articlesMenu__container__backButton}
        >
          Retour
        </button>
        <div className={styles.articlesMenu__container__projectList}>
          <div
            className={styles.articlesMenu__container__projectList__container}
          >
            <div
              className={
                styles.articlesMenu__container__projectList__container__wrapper
              }
            >
              {database.projects.map((project) => {
                const isSelected = project.id === openedProject;
                return (
                  <span
                    key={project.id}
                    className={`${styles.projectName} ${
                      isSelected ? styles.selected : ''
                    }`}
                    onClick={(e) => handleProjectClick(project.id, e)}
                    data-no-sticker
                  >
                    {project.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesMenu;
