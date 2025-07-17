import React from 'react';
import database from '../../../db/database.json'; // Importation du fichier JSON
import Image from 'next/image';
import styles from './projectsInmain.module.scss';

const ProjectsInMain = ({ handleMainClick }) => {
  return (
    <div>
      {database.projects.map((project, idx) => (
        <div
          key={project.id}
          className={styles.projectsInMain__container__image__container}
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
  );
};

export default ProjectsInMain;
