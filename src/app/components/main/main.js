import styles from './main.module.scss';
import Hero from './hero/hero';
import ProjectsInMain from './projectsInMain/projectsInMain';
import SectionClickStickers from '../SectionClickStickers';
import { useRefs } from '../../animations/context';

const Main = ({ clickStickers = [] }) => {
  const { handleMainClick } = useRefs();

  return (
    <div className={styles.main__container}>
      <SectionClickStickers clickStickers={clickStickers} />
      <Hero />
      <ProjectsInMain handleMainClick={handleMainClick} />
    </div>
  );
};

export default Main;
