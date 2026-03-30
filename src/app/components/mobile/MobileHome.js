'use client';
import Image from 'next/image';
import styles from './MobileHome.module.scss';
import { DEFAULT_DESCRIPTION } from '../sidebar/sidebarContent';
import { usePortfolioData } from '../../animations/providers/PortfolioDataProvider';

const MobileHome = ({ onLinkClick }) => {
  const { database } = usePortfolioData();

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick(window.innerWidth, window.innerHeight, e.currentTarget.href);
    }
  };
  const projects = database.projects || [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.name}>Timothée<br />Casilli</div>
        <div className={styles.center}>
          <span>Paris, France</span>
          <a href="mailto:timotheeclp@gmail.com" onClick={handleLinkClick}>timotheeclp@gmail.com</a>
        </div>
        <div className={styles.right}>
          <a href="https://www.instagram.com/timothee.casilli/" onClick={handleLinkClick}>Instagram</a>
          <span>CV</span>
        </div>
      </header>

      <div className={styles.heroImage}>
        <Image
          src="/images/herisson.png"
          alt="Timothée Casilli"
          width={1200}
          height={1200}
          quality={90}
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div className={styles.projects}>
        {projects.map((project) => {
          if (!project.pictures || project.pictures.length === 0) return null;
          return (
            <div key={project.id} className={styles.projectImage}>
              <Image
                src={project.pictures[0].url}
                alt={project.name}
                width={1200}
                height={1200}
                quality={90}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.description}>
        <p>{DEFAULT_DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default MobileHome;
