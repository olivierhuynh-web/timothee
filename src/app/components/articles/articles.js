import React from 'react';
import styles from './articles.module.scss';
import ArticlesMenu from './articlesMenu/articlesMenu';
import Image from 'next/image';
import { useRefs } from '../../animations/context';
import Stickers from '../main/stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';

const Articles = ({ clickStickers = [] }) => {
  const { openedProject, database } = useRefs();

  // Trouve le projet correspondant à l'ID dans openedProject, ou le premier projet par défaut
  const project =
    database.projects.find((p) => p.id === openedProject) ||
    database.projects[0];

  return (
    <div className={styles.articles}>
      {/* <Stickers /> */}
      <SectionClickStickers clickStickers={clickStickers} />
      <div className={styles.articles__container}>
        <div className={styles.articles__container__wrapper}>
          <div className={styles.articles__container__wrapper__project}>
            <div>
              <span>{project.pictures[0].caption}</span>
            </div>
            <div
              className={styles.articles__container__wrapper__project__images}
            >
              <Image
                width={300}
                height={150}
                src={project.pictures[0].url}
                alt={`Image du projet ${project.pictures[0].caption}`}
                style={{
                  width: 'auto',
                  height: '100%',
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

export default Articles;
