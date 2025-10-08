import React from 'react';
import styles from './articles.module.scss';
import ArticlesMenu from './articlesMenu/articlesMenu';
import Image from 'next/image';
import database from '../../db/database.json';
import { useRefs } from '../../animations/context';

const articles = () => {
  const { openedProject } = useRefs();
  
  // Trouve le projet correspondant à l'ID dans openedProject, ou le premier projet par défaut
  const project = database.projects.find(p => p.id === openedProject) || database.projects[0];

  return (
    <div className={styles.articles}>
      <div className={styles.articles__container}>
        <div className={styles.articles__container__wrapper}>
          <div className={styles.articles__project}>
            <h1>
              <span>{project.name}</span>
            </h1>
            <div className={styles.articles__images}>
              <Image
                width={300}
                height={150}
                src={project.pictures[0]}
                alt={`Image du projet ${project.name}`}
                style={{
                  width: '60%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                priority
              />
            </div>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.articles__background}></div>
      <div className={styles.articles__foreground}></div>
      <ArticlesMenu />
    </div>
  );
};

export default articles;
