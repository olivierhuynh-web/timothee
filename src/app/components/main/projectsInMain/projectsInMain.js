import React from 'react';
import database from '../../../db/database.json'; // Importation du fichier JSON
import Image from 'next/image';

const ProjectsInMain = () => {
  return (
    <div>
      <Image
        width={150}
        height={300}
        className='welcomeImage'
        src={database.projects[0].pictures[0]} // Accès à la première image du premier projet
        alt='Image de bienvenue'
        style={{ width: '60%', height: 'auto', objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default ProjectsInMain;
