import { Variants } from 'framer-motion';

// Optimized animation system for smooth performance
// Using transform3d for hardware acceleration and reduced motion support

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Base transition settings for smooth animations
const baseTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.1, 0.25, 1], // Optimized cubic-bezier for smooth motion
  duration: 0.2,
};

const fastTransition = {
  ...baseTransition,
  duration: 0.15,
};

const slowTransition = {
  ...baseTransition,
  duration: 0.3,
};

// Optimized page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -8,
  },
};

export const pageTransition = {
  ...baseTransition,
  duration: 0.25,
};

// Optimized stagger animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
};

// Smooth card animations with hardware acceleration
export const cardHover = {
  scale: 1.01,
  y: -2,
  transition: fastTransition,
};

export const cardTap = {
  scale: 0.99,
  transition: {
    duration: 0.1,
  },
};

// Optimized button animations
export const buttonHover = {
  scale: 1.02,
  transition: fastTransition,
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
};

// Smooth modal animations
export const modalBackdrop: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: fastTransition,
  },
};

// Sidebar animations moved to dedicated file for better organization

// Smooth notification animations
export const notificationVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9,
    transition: fastTransition,
  },
};

// Optimized chart animations
export const chartVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: slowTransition,
  },
};

// Loading animations
export const loadingVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

// RTL-aware animations
export const rtlAwareVariants = (direction: 'ltr' | 'rtl') => ({
  initial: {
    opacity: 0,
    x: direction === 'rtl' ? 8 : -8,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    x: direction === 'rtl' ? -8 : 8,
    transition: fastTransition,
  },
});

// Accessibility-friendly animations
export const reducedMotionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Fade animations for simple transitions
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

// Slide animations
export const slideUp: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: fastTransition,
  },
};

export const slideDown: Variants = {
  initial: {
    opacity: 0,
    y: -16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: fastTransition,
  },
};

// Scale animations
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: fastTransition,
  },
};

// Get appropriate variants based on user preferences
export const getVariants = (baseVariants: Variants, forceReducedMotion: boolean = false) => {
  if (prefersReducedMotion || forceReducedMotion) {
    return reducedMotionVariants;
  }
  return baseVariants;
};

// Optimized hover animations for interactive elements
export const createHoverAnimation = (scale: number = 1.02, y: number = -1) => ({
  scale,
  y,
  transition: fastTransition,
});

export const createTapAnimation = (scale: number = 0.98) => ({
  scale,
  transition: {
    duration: 0.1,
  },
});

// List item animations for smooth scrolling
export const listItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 4,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.1,
    },
  },
};

// Optimized stagger for lists
export const listContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03,
    },
  },
};

// Smooth transitions for form elements
export const formFieldVariants: Variants = {
  initial: {
    opacity: 0,
    y: 4,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
};

// Table row animations
export const tableRowVariants: Variants = {
  initial: {
    opacity: 0,
    x: -8,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    x: 8,
    transition: {
      duration: 0.1,
    },
  },
};

// Optimized dropdown animations
export const dropdownVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: {
      duration: 0.1,
    },
  },
};