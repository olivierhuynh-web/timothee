import React, { useState, useEffect } from 'react';
import styles from './articles.module.scss';
import ArticlesMenu from './articlesMenu/articlesMenu';
import Image from 'next/image';
import { useRefs } from '../../animations/context';
import Stickers from '../main/stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';

const Articles = ({ clickStickers = [] }) => {
  const { openedProject, database } = useRefs();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Trouve le projet correspondant à l'ID dans openedProject, ou le premier projet par défaut
  const project =
    database.projects.find((p) => p.id === openedProject) ||
    database.projects[0];

  // Réinitialiser l'index de l'image quand le projet change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [openedProject]);

  // Gestionnaire de clic pour la navigation entre les images
  const handleImageClick = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const clickPercentage = (clickX / containerWidth) * 100;

    const currentImage = project.pictures[currentImageIndex];
    const currentId = parseInt(currentImage.id);

    // Si le clic est dans les 50% à gauche, aller à l'image précédente
    if (clickPercentage < 50) {
      // Chercher l'image avec l'ID précédent
      const previousImageIndex = project.pictures.findIndex(
        (pic) => parseInt(pic.id) === currentId - 1
      );

      if (previousImageIndex !== -1) {
        setCurrentImageIndex(previousImageIndex);
      } else {
        // Si on est sur la première image, aller à la dernière
        setCurrentImageIndex(project.pictures.length - 1);
      }
    }
    // Si le clic est dans les 50% à droite, aller à l'image suivante
    else {
      // Chercher l'image avec l'ID suivant
      const nextImageIndex = project.pictures.findIndex(
        (pic) => parseInt(pic.id) === currentId + 1
      );

      if (nextImageIndex !== -1) {
        setCurrentImageIndex(nextImageIndex);
      } else {
        // Si on est sur la dernière image, retourner à la première
        setCurrentImageIndex(0);
      }
    }
  };

  return (
    <div className={styles.articles}>
      {/* <Stickers /> */}
      <SectionClickStickers clickStickers={clickStickers} />
      <div className={styles.articles__container}>
        <div className={styles.articles__container__wrapper} data-no-sticker>
          <div className={styles.articles__container__wrapper__project}>
            <div>
              <span>{project.pictures[currentImageIndex].caption}</span>
            </div>
            <div
              className={styles.articles__container__wrapper__project__images}
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            >
              <Image
                width={600}
                height={300}
                src={project.pictures[currentImageIndex].url}
                alt={`Image du projet ${project.pictures[currentImageIndex].caption}`}
                style={{
                  width: 'auto',
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

export default Articles;
