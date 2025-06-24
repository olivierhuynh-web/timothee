import React from 'react';
import styles from './main.module.scss'; // Assuming you have a CSS module for styling
import Hero from './hero/hero'; // Importing the Hero component

const main = () => {
  return (
    <div className={styles.main__container}>
      <Hero />
    </div>
  );
};

export default main;
