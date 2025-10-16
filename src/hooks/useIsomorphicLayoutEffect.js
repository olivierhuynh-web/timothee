import { useLayoutEffect, useEffect } from 'react';

/**
 * Hook qui utilise useLayoutEffect côté client et useEffect côté serveur
 * pour éviter les warnings SSR de Next.js
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
