import styles from './main.module.scss';
import Hero from './hero/hero';
import ProjectsInMain from './projectsInMain/projectsInMain';
import Stickers from './stickers/stickers';
import { useRefs } from '../../animations/context';

const Main = () => {
  const { handleMainClick } = useRefs();

  return (
    <div className={styles.main__container}>
      <Stickers />
      <Hero />
      <ProjectsInMain handleMainClick={handleMainClick} />
    </div>
  );
};

export default Main;
