"use client";

import { useEffect } from "react";

export function ScrollAnimator() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("main section"),
    ) as HTMLElement[];

    elements.forEach((element, index) => {
      element.classList.add("reveal-section");
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(index % 6, 5) * 70}ms`,
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-inview");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return null;
}
