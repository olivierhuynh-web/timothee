/**
 * Context pour gérer les refs et l'état global des animations
 */
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { getProjects, getStickers } from '../lib/strapi';
import { useArticlesMenuAnimation } from './hooks/useArticlesMenuAnimation';
import { useSectionSlider } from './hooks/useSectionSlider';

const RefsContext = createContext(null);

// Cache global pour les images préchargées
const preloadedImages = new Map();
let lastPreloadedPaths = null;

// Fonction de préchargement silencieux
const preloadStickers = (paths) => {
  if (lastPreloadedPaths === paths || !paths.length) return;
  lastPreloadedPaths = paths;

  paths.forEach((path) => {
    if (!preloadedImages.has(path)) {
      const img = new Image();
      img.src = path;
      img.onload = () => preloadedImages.set(path, img);
    }
  });
};

export function RefsProvider({ children }) {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const wrapperRef = useRef(null);
  const articlesRef = useRef(null);
  const indexButtonRef = useRef(null);
  const sidebarHeaderRef = useRef(null);
  const projectsListRef = useRef(null);
  const projectPicturesRefs = useRef([]);
  const articlesMenuRef = useRef(null);
  const projectsInMainRef = useRef(null);
  const placeholderRef = useRef(null);

  // États
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [openedProject, setOpenedProject] = useState(null);
  const [visibleProjectIndex, setVisibleProjectIndex] = useState(null);
  const [currentProjectDescription, setCurrentProjectDescription] = useState('');
  const [database, setDatabase] = useState({ projects: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [stickerPaths, setStickerPaths] = useState([]);

  // États pour les click stickers centralisés
  const [mainClickStickers, setMainClickStickers] = useState([]);
  const [sidebarClickStickers, setSidebarClickStickers] = useState([]);
  const [articlesClickStickers, setArticlesClickStickers] = useState([]);
  // const [scrollPositions, setScrollPositions] = useState({});

  // Charger les projets et stickers depuis Strapi au montage du composant
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      // Charger en parallèle pour plus de performance
      const [projects, stickers] = await Promise.all([
        getProjects(),
        getStickers(),
      ]);

      setDatabase({ projects });
      setStickerPaths(stickers);
      setIsLoading(false);
    }

    loadData();
  }, []);

  // Précharge les stickers quand ils sont disponibles
  useEffect(() => {
    const activeStickerPaths = stickerPaths.length > 0
      ? stickerPaths
      : Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);
    preloadStickers(activeStickerPaths);
  }, [stickerPaths]);

  // Gère le clic sur un projet
  const handleProjectClick = (projectId) => {
    setOpenedProject(projectId);
  };

  // Constantes pour la gestion des stickers aux frontières
  const STICKER_SIZE = 125;

  // Fonction centralisée pour ajouter un sticker avec gestion des frontières
  const addClickSticker = (e, sectionName, sectionRef) => {
    // Vérifie les zones interdites
    const clickedElement = e.target;
    const isInNoStickerZone = clickedElement.closest('[data-no-sticker]');
    const isInArticlesSection = sectionName === 'articles';

    if (isInArticlesSection) {
      const isInAllowedZone = clickedElement.closest('[data-sticker-allowed]');
      if (!isInAllowedZone) return;
    } else if (isInNoStickerZone) {
      return;
    }

    // Sélectionne un sticker aléatoire
    const activeStickerPaths = stickerPaths.length > 0
      ? stickerPaths
      : Array.from({ length: 27 }, (_, i) => `/stickers/${i + 1}.png`);
    const randomSticker = activeStickerPaths[Math.floor(Math.random() * activeStickerPaths.length)];

    // Propriétés communes du sticker
    const rotation = Math.random() * 30 - 15;
    const scale = 0.8 + Math.random() * 0.4;
    const baseId = Date.now();

    // Coordonnées viewport
    const viewportX = e.clientX;
    const viewportY = e.clientY;
    const viewportWidth = window.innerWidth;

    // Frontière Main/Sidebar en pixels (60vw)
    const boundaryX = viewportWidth * 0.6;

    // Position du sticker (centré sur le clic)
    const stickerLeft = viewportX - STICKER_SIZE / 2;
    const stickerRight = stickerLeft + STICKER_SIZE;

    // Fonction helper pour obtenir le scrollTop d'une section
    const getScrollTop = (ref) => {
      if (!ref?.current) return 0;
      let scrollTop = ref.current.scrollTop;
      if (scrollTop === 0 && ref.current.children.length > 0) {
        const firstChild = ref.current.children[0];
        if (firstChild.scrollTop > 0 || firstChild.scrollHeight > firstChild.clientHeight) {
          scrollTop = firstChild.scrollTop;
        }
      }
      return scrollTop;
    };

    if (sectionName === 'main') {
      // Clic dans Main
      const mainRect = mainRef.current.getBoundingClientRect();
      const mainScrollTop = getScrollTop(mainRef);
      const localX = viewportX - mainRect.left - STICKER_SIZE / 2;
      const localY = viewportY - mainRect.top + mainScrollTop - STICKER_SIZE / 2;

      // Ajoute le sticker à Main
      setMainClickStickers(prev => [...prev, {
        id: `click-main-${baseId}`,
        src: randomSticker,
        x: localX,
        y: localY,
        rotation,
        scale,
      }]);

      // Si le sticker déborde dans Sidebar, créer une copie
      if (stickerRight > boundaryX && sidebarRef.current) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const sidebarScrollTop = getScrollTop(sidebarRef);
        const sidebarLocalX = stickerLeft - sidebarRect.left;
        const sidebarLocalY = viewportY - sidebarRect.top + sidebarScrollTop - STICKER_SIZE / 2;

        setSidebarClickStickers(prev => [...prev, {
          id: `click-sidebar-mirror-${baseId}`,
          src: randomSticker,
          x: sidebarLocalX,
          y: sidebarLocalY,
          rotation,
          scale,
        }]);
      }
    } else if (sectionName === 'sidebar') {
      // Clic dans Sidebar
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const sidebarScrollTop = getScrollTop(sidebarRef);
      const localX = viewportX - sidebarRect.left - STICKER_SIZE / 2;
      const localY = viewportY - sidebarRect.top + sidebarScrollTop - STICKER_SIZE / 2;

      // Ajoute le sticker à Sidebar
      setSidebarClickStickers(prev => [...prev, {
        id: `click-sidebar-${baseId}`,
        src: randomSticker,
        x: localX,
        y: localY,
        rotation,
        scale,
      }]);

      // Si le sticker déborde dans Main, créer une copie
      if (stickerLeft < boundaryX && mainRef.current) {
        const mainRect = mainRef.current.getBoundingClientRect();
        const mainScrollTop = getScrollTop(mainRef);
        const mainLocalX = stickerLeft - mainRect.left;
        const mainLocalY = viewportY - mainRect.top + mainScrollTop - STICKER_SIZE / 2;

        setMainClickStickers(prev => [...prev, {
          id: `click-main-mirror-${baseId}`,
          src: randomSticker,
          x: mainLocalX,
          y: mainLocalY,
          rotation,
          scale,
        }]);
      }
    } else if (sectionName === 'articles') {
      // Clic dans Articles (pas de gestion de frontière pour l'instant)
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = getScrollTop(sectionRef);
      const localX = viewportX - rect.left - STICKER_SIZE / 2;
      const localY = viewportY - rect.top + scrollTop - STICKER_SIZE / 2;

      setArticlesClickStickers(prev => [...prev, {
        id: `click-articles-${baseId}`,
        src: randomSticker,
        x: localX,
        y: localY,
        rotation,
        scale,
      }]);
    }
  };

  // Utilisation des hooks custom pour les animations
  useArticlesMenuAnimation(articlesMenuRef, isMainOpen);
  const { slideRight, slideLeft } = useSectionSlider(wrapperRef, articlesRef);

  // Gestionnaires d'événements
  const handleMainClick = () => {
    setIsMainOpen(false);
    slideRight();
  };

  const handleArticlesMenuClick = () => {
    setIsMainOpen(true);
    slideLeft();
  };

  return (
    <RefsContext.Provider
      value={{
        // Refs
        mainRef,
        sidebarRef,
        wrapperRef,
        articlesRef,
        indexButtonRef,
        sidebarHeaderRef,
        projectsListRef,
        projectPicturesRefs,
        articlesMenuRef,
        projectsInMainRef,
        placeholderRef,

        // État
        isMainOpen,
        openedProject,
        visibleProjectIndex,
        currentProjectDescription,
        database,
        isLoading,
        stickerPaths,

        // Click Stickers centralisés
        mainClickStickers,
        sidebarClickStickers,
        articlesClickStickers,
        addClickSticker,

        // Setters
        setIsMainOpen,
        setOpenedProject,
        setVisibleProjectIndex,
        setCurrentProjectDescription,

        // Gestionnaires
        handleMainClick,
        handleArticlesMenuClick,
        handleProjectClick,
      }}
    >
      {children}
    </RefsContext.Provider>
  );
}

export function useRefs() {
  return useContext(RefsContext);
}
