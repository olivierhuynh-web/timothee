import React from 'react';
import styles from './main.module.scss'; // Assuming you have a CSS module for styling
import Hero from './hero/hero'; // Importing the Hero component
import ProjectsInMain from './projectsInMain/projectsInMain'; // Importing the ProjectsInMain component

const main = () => {
  return (
    <div className={styles.main__container}>
      <Hero />
      <ProjectsInMain />
    </div>
  );
};

export default main;
