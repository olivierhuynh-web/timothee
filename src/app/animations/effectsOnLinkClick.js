const effectsOnLinkClick = () => {
  const stickers = Array.from(
    { length: 27 },
    (_, i) => `/stickers/${i + 1}.png`
  );

  // Fais une répartition aléatoire dans une zone définie
  const distributeStickers = (zoneWidth, zoneHeight, numberOfStickers = 5) => {
    const stickerSize = 100; // Taille de base des stickers en pixels

    // Sélectionne aléatoirement des stickers parmi les 27 disponibles
    const selectedStickers = Array.from({ length: numberOfStickers }, () => {
      const randomIndex = Math.floor(Math.random() * stickers.length);
      return stickers[randomIndex];
    });

    // Positionne les stickers de manière aléatoire
    const positionedStickers = selectedStickers.map((stickerPath, index) => {
      // Calcule des positions aléatoires en évitant les bords
      const maxX = zoneWidth - stickerSize;
      const maxY = zoneHeight - stickerSize;

      // S'assure que les stickers ne sont pas trop proches des bords
      const x = Math.max(20, Math.random() * maxX - 20);
      const y = Math.max(20, Math.random() * maxY - 20);

      // Rotation aléatoire entre -15 et 15 degrés
      const rotation = Math.random() * 30 - 15;

      // Échelle aléatoire entre 0.8 et 1.2
      const scale = 0.8 + Math.random() * 0.4;

      return {
        id: index,
        src: stickerPath,
        x,
        y,
        rotation,
        scale,
        zIndex: Math.floor(Math.random() * 10),
      };
    });

    return positionedStickers;
  };

  return { distributeStickers };
};

export default effectsOnLinkClick;
