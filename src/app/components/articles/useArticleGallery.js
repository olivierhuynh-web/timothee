import { useEffect, useMemo, useState } from 'react';

const CURSOR_LEFT = "url('/cursors/cursor-left.svg') 16 16, auto";
const CURSOR_RIGHT = "url('/cursors/cursor-right.svg') 16 16, auto";

function getProjectById(projects, openedProject) {
  return projects.find((project) => project.id === openedProject) || projects[0];
}

function getAdjacentImageIndex(pictures, currentImageIndex, direction) {
  const currentImage = pictures[currentImageIndex];
  const currentId = parseInt(currentImage.id, 10);
  const targetId = direction === 'previous' ? currentId - 1 : currentId + 1;

  const adjacentImageIndex = pictures.findIndex(
    (picture) => parseInt(picture.id, 10) === targetId
  );

  if (adjacentImageIndex !== -1) {
    return adjacentImageIndex;
  }

  return direction === 'previous' ? pictures.length - 1 : 0;
}

export function useArticleGallery(projects, openedProject) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cursorDirection, setCursorDirection] = useState(CURSOR_RIGHT);

  const project = useMemo(
    () => getProjectById(projects, openedProject),
    [openedProject, projects]
  );

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [openedProject]);

  const currentImage = project?.pictures?.[currentImageIndex] ?? null;

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const isLeftSide = mouseX < rect.width / 2;

    setCursorDirection(isLeftSide ? CURSOR_LEFT : CURSOR_RIGHT);
  };

  const handleImageClick = (event) => {
    if (!project?.pictures?.length) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const direction = clickX < rect.width / 2 ? 'previous' : 'next';

    setCurrentImageIndex((prevIndex) =>
      getAdjacentImageIndex(project.pictures, prevIndex, direction)
    );
  };

  return {
    project,
    currentImage,
    cursorDirection,
    handleMouseMove,
    handleImageClick,
  };
}
