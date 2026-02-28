import React from 'react';
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

  // Afficher un état de chargement si les données ne sont pas encore disponibles
  if (isLoading || !database.projects || database.projects.length === 0) {
    return (
      <section
        className={styles.projectsInMain__container}
        ref={projectsInMainRef}
      >
        <div className={styles.projectsList} ref={projectsListRef}></div>
        <div className={styles.projectsInMain__images}>
          {/* État de chargement ou aucun projet */}
        </div>
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
        {database.projects.map((project, idx) => {
          // Vérifier que le projet a au moins une image
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
