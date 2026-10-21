import { gsap } from "gsap";

export const EASE = {
  soft: "power2.out",
  cinema: "power1.inOut",
  snap: "power3.in",
} as const;

export const DUR = {
  fast: 0.15,
  base: 0.6,
  reveal: 1.2,
  scene: 0.9,
} as const;

export function staggerWords(targets: string | Element | Element[]) {
  gsap.from(targets, {
    opacity: 0,
    y: 24,
    stagger: 0.06,
    ease: EASE.soft,
    duration: DUR.base,
  });
}

export function reveal(targets: string | Element | Element[]) {
  gsap.from(targets, {
    opacity: 0,
    filter: "blur(8px)",
    stagger: 0.02,
    ease: EASE.cinema,
    duration: DUR.reveal,
  });
}

export function fadeUp(targets: string | Element | Element[]) {
  gsap.from(targets, {
    y: 40,
    opacity: 0,
    ease: EASE.soft,
    duration: DUR.base,
  });
}

export function flipUp(targets: string | Element | Element[]) {
  gsap.fromTo(
    targets,
    { y: 4, opacity: 0 },
    { y: 0, opacity: 1, ease: EASE.snap, duration: DUR.fast }
  );
}
