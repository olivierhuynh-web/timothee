const FALLBACK_STICKER_COUNT = 27;
const STICKER_SIZE = 125;

const preloadedImages = new Map();
let lastPreloadedPaths = null;

export function getFallbackStickerPaths() {
  return Array.from(
    { length: FALLBACK_STICKER_COUNT },
    (_, index) => `/stickers/${index + 1}.png`
  );
}

export function getActiveStickerPaths(stickerPaths) {
  return stickerPaths.length > 0 ? stickerPaths : getFallbackStickerPaths();
}

export function preloadStickers(paths) {
  if (lastPreloadedPaths === paths || !paths.length) return;
  lastPreloadedPaths = paths;

  paths.forEach((path) => {
    if (!preloadedImages.has(path)) {
      const img = new Image();
      img.src = path;
      img.onload = () => preloadedImages.set(path, img);
    }
  });
}

export function getScrollTop(ref) {
  if (!ref?.current) return 0;

  let scrollTop = ref.current.scrollTop;

  if (scrollTop === 0 && ref.current.children.length > 0) {
    const firstChild = ref.current.children[0];

    if (
      firstChild.scrollTop > 0 ||
      firstChild.scrollHeight > firstChild.clientHeight
    ) {
      scrollTop = firstChild.scrollTop;
    }
  }

  return scrollTop;
}

export { STICKER_SIZE };
