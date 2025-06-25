import Image from 'next/image';
import styles from './page.module.scss';
import Hero from './components/main/hero/hero';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
// import { gsap } from 'gsap';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Main />
        <Sidebar />
      </div>
    </div>
  );
}
