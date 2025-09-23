import React from 'react';
import database from '../../../db/database.json';
import Image from 'next/image';
import styles from './projectsInmain.module.scss';
import { useRefs } from '../../../animations/context';

const ProjectsInMain = ({ handleMainClick }) => {
  const { projectPicturesRefs, projectsListRef } = useRefs();

  return (
    <section className={styles.projectsInMain__container}>
      <div className={styles.projectsList} ref={projectsListRef}></div>
      <div className={styles.projectsInMain__images}>
        {database.projects.map((project, idx) => (
          <div
            key={project.id}
            className={styles.projectsInMain__container__image__container}
            ref={(el) => (projectPicturesRefs.current[idx] = el)}
          >
            <Image
              width={150}
              height={300}
              className='welcomeImage'
              src={project.pictures[0]}
              alt={`Image de ${project.name}`}
              style={{ width: '60%', height: 'auto', objectFit: 'contain' }}
              priority
              onClick={handleMainClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsInMain;
