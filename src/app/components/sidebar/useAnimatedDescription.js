'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function createAnimatedWordsMarkup(text) {
  return text
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(
      (word) =>
        `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(15px);">${word}</span>`
    )
    .join(' ');
}

export function useAnimatedDescription(text) {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!descriptionRef.current) {
      return;
    }

    descriptionRef.current.innerHTML = createAnimatedWordsMarkup(text);

    const wordSpans = descriptionRef.current.querySelectorAll('.word');

    gsap.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.out',
    });
  }, [text]);

  return descriptionRef;
}
