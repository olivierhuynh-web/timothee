import styles from './main.module.scss';
import Hero from './hero/hero';
import ProjectsInMain from './projectsInMain/projectsInMain';
// import Stickers from './stickers/stickers';
import SectionClickStickers from '../SectionClickStickers';
import { useRefs } from '../../animations/context';

const Main = ({ clickStickers = [] }) => {
  const { handleMainClick } = useRefs();

  return (
    <div className={styles.main__container}>
      {/* <Stickers /> */}
      <SectionClickStickers clickStickers={clickStickers} />
      <Hero />
      <ProjectsInMain handleMainClick={handleMainClick} />
    </div>
  );
};

export default Main;
