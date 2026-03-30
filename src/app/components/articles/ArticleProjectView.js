import Image from 'next/image';
import styles from './articles.module.scss';

function renderCaption(caption, index) {
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

export default function ArticleProjectView({
  currentImage,
  cursorDirection,
  handleImageClick,
  handleMouseMove,
}) {
  return (
    <div className={styles.articles__container__wrapper} data-sticker-allowed>
      <div className={styles.articles__container__wrapper__project}>
        <div className={styles.articles__container__wrapper__project__heading}>
          <span>{currentImage.heading}</span>
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
            src={currentImage.url}
            alt={`Image du projet ${currentImage.heading}`}
            style={{
              objectFit: 'contain',
            }}
            sizes='(max-width: 768px) 100vw, 90vw'
            priority
          />
        </div>
        <div className={styles.articles__container__wrapper__project__captions}>
          {currentImage.captions?.map(renderCaption)}
        </div>
      </div>
    </div>
  );
}
