import React from 'react';
import Image from 'next/image';

const hero = () => {
  return (
    <div>
      <Image
        src='/images/welcome.png'
        alt='Image de bienvenue'
        width={600}
        height={300}
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        priority
      />
    </div>
  );
};

export default hero;
