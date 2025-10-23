import { Variants } from 'framer-motion';

// Optimized sidebar animations for smooth expansion/collapse
export const sidebarVariants: Variants = {
  collapsed: {
    width: 80,
    transition: {
      type: 'tween',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.2,
    },
  },
  expanded: {
    width: 280,
    transition: {
      type: 'tween',
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.2,
    },
  },
};

// Logo animation variants
export const logoVariants: Variants = {
  expanded: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      delay: 0.1,
    },
  },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

// Navigation item animations
export const navItemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.15,
      delay: 0.05,
    },
  },
  collapsed: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Text content animations
export const textContentVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.15,
      delay: 0.1,
    },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.1,
    },
  },
};

// Smooth toggle button animation
export const toggleButtonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.1,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Footer animation
export const footerVariants: Variants = {
  expanded: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      delay: 0.1,
    },
  },
  collapsed: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.1,
    },
  },
};
