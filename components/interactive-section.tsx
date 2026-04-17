"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type InteractiveSectionProps = {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
};

export function InteractiveSection({
  children,
  className,
  glowClassName,
}: InteractiveSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-academy-orange/10 blur-3xl",
          glowClassName,
        )}
        animate={{
          x: [0, 24, 0],
          y: [0, 18, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-academy-orange/10 blur-3xl"
        animate={{
          x: [0, -28, 0],
          y: [0, -14, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">{children}</div>
    </motion.div>
  );
}
