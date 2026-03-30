import Image from 'next/image';
import styles from './projectsInMain.module.scss';
import { useRefs } from '../../../animations/context';

const ProjectsInMain = ({ handleMainClick }) => {
  const {
    projectPicturesRefs,
    projectsListRef,
    handleProjectClick,
    database,
    projectsInMainRef,
    isLoading,
  } = useRefs();
  const projects = database.projects || [];

  if (isLoading || projects.length === 0) {
    return (
      <section
        className={styles.projectsInMain__container}
        ref={projectsInMainRef}
      >
        <div className={styles.projectsList} ref={projectsListRef}></div>
        <div className={styles.projectsInMain__images}></div>
      </section>
    );
  }

  return (
    <section
      className={styles.projectsInMain__container}
      ref={projectsInMainRef}
    >
      <div className={styles.projectsList} ref={projectsListRef}></div>
      <div className={styles.projectsInMain__images}>
        {projects.map((project, idx) => {
          if (!project.pictures || project.pictures.length === 0) {
            return null;
          }

          return (
            <div
              key={project.id}
              className={styles.projectsInMain__container__image__container}
              ref={(el) => (projectPicturesRefs.current[idx] = el)}
            >
              <div className={styles.imageWrapper}>
                <div className={styles.imageShadow}></div>
                <div className={styles.imageContent}>
                  <Image
                    width={1200}
                    height={1200}
                    quality={90}
                    className='welcomeImage'
                    src={project.pictures[0].url}
                    alt={`Image de ${project.name}`}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    priority
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project.id);
                      handleMainClick();
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsInMain;
