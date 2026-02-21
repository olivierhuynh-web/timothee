import React, { useState, useEffect } from 'react';
import styles from './articles.module.scss';
import ArticlesMenu from './articlesMenu/articlesMenu';
import Image from 'next/image';
import { useRefs } from '../../animations/context';
import Stickers from '../main/stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';

const Articles = ({ clickStickers = [] }) => {
  const { openedProject, database, isLoading } = useRefs();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cursorDirection, setCursorDirection] = useState("url('/cursors/cursor-right.svg') 16 16, auto");

  // Réinitialiser l'index de l'image quand le projet change
  // IMPORTANT: Les hooks doivent être appelés AVANT tout return conditionnel
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [openedProject]);

  // Vérifier que les données sont chargées et qu'il y a au moins un projet
  if (isLoading || !database.projects || database.projects.length === 0) {
    return (
      <div className={styles.articles}>
        <SectionClickStickers clickStickers={clickStickers} />
        <div className={styles.articles__container}>
          {/* État de chargement */}
        </div>
        <div className={styles.articles__background}></div>
        <div className={styles.articles__foreground}></div>
        <ArticlesMenu />
      </div>
    );
  }

  // Trouve le projet correspondant à l'ID dans openedProject, ou le premier projet par défaut
  const project =
    database.projects.find((p) => p.id === openedProject) ||
    database.projects[0];

  // Vérifier que le projet a des images
  if (!project || !project.pictures || project.pictures.length === 0) {
    return (
      <div className={styles.articles}>
        <SectionClickStickers clickStickers={clickStickers} />
        <div className={styles.articles__container}>
          {/* Aucune image disponible */}
        </div>
        <div className={styles.articles__background}></div>
        <div className={styles.articles__foreground}></div>
        <ArticlesMenu />
      </div>
    );
  }

  // Gestionnaire de mouvement de souris pour changer le curseur
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const mousePercentage = (mouseX / containerWidth) * 100;

    if (mousePercentage < 50) {
      setCursorDirection("url('/cursors/cursor-left.svg') 16 16, auto"); // Flèche vers la gauche
    } else {
      setCursorDirection("url('/cursors/cursor-right.svg') 16 16, auto"); // Flèche vers la droite
    }
  };

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
        <div className={styles.articles__container__wrapper} data-sticker-allowed>
          <div className={styles.articles__container__wrapper__project}>
            <div
              className={styles.articles__container__wrapper__project__heading}
            >
              <span>{project.pictures[currentImageIndex].heading}</span>
            </div>
            <div
              className={styles.articles__container__wrapper__project__images}
              onClick={handleImageClick}
              onMouseMove={handleMouseMove}
              style={{
                cursor: cursorDirection,
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                fill
                src={project.pictures[currentImageIndex].url}
                alt={`Image du projet ${project.pictures[currentImageIndex].heading}`}
                style={{
                  objectFit: 'contain',
                }}
                sizes='(max-width: 768px) 100vw, 90vw'
                priority
              />
            </div>
            <div
              className={styles.articles__container__wrapper__project__captions}
            >
              {project.pictures[currentImageIndex].captions?.map(
                (caption, index) => {
                  const parts = caption.split(',');
                  const firstPart = parts[0];
                  const rest = parts.slice(1).join(',');
                  const isUntitled = firstPart.trim() === '(non titré)';

                  return (
                    <p key={index}>
                      {isUntitled ? firstPart : <i>{firstPart}</i>}
                      {rest && `,${rest}`}
                    </p>
                  );
                }
              )}
            </div>
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
