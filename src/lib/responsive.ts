// Responsive design utilities and breakpoints

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Tailwind CSS breakpoint values
export const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Get current screen size
export const getScreenSize = (): Breakpoint => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

// Check if screen is mobile
export const isMobile = (): boolean => {
  return getScreenSize() === 'xs' || getScreenSize() === 'sm';
};

// Check if screen is tablet
export const isTablet = (): boolean => {
  return getScreenSize() === 'md';
};

// Check if screen is desktop
export const isDesktop = (): boolean => {
  return getScreenSize() === 'lg' || getScreenSize() === 'xl' || getScreenSize() === '2xl';
};

// Responsive grid columns
export const getGridColumns = (screenSize: Breakpoint): number => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return 1;
    case 'md':
      return 2;
    case 'lg':
      return 3;
    case 'xl':
      return 4;
    case '2xl':
      return 5;
    default:
      return 3;
  }
};

// Responsive spacing
export const getResponsiveSpacing = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
      return {
        padding: 'p-2',
        margin: 'm-2',
        gap: 'gap-2',
        space: 'space-y-2',
      };
    case 'sm':
      return {
        padding: 'p-3',
        margin: 'm-3',
        gap: 'gap-3',
        space: 'space-y-3',
      };
    case 'md':
      return {
        padding: 'p-4',
        margin: 'm-4',
        gap: 'gap-4',
        space: 'space-y-4',
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        padding: 'p-6',
        margin: 'm-6',
        gap: 'gap-6',
        space: 'space-y-6',
      };
    default:
      return {
        padding: 'p-4',
        margin: 'm-4',
        gap: 'gap-4',
        space: 'space-y-4',
      };
  }
};

// Responsive text sizes
export const getResponsiveTextSize = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        h1: 'text-2xl',
        h2: 'text-xl',
        h3: 'text-lg',
        body: 'text-sm',
        caption: 'text-xs',
      };
    case 'md':
      return {
        h1: 'text-3xl',
        h2: 'text-2xl',
        h3: 'text-xl',
        body: 'text-base',
        caption: 'text-sm',
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        body: 'text-lg',
        caption: 'text-base',
      };
    default:
      return {
        h1: 'text-3xl',
        h2: 'text-2xl',
        h3: 'text-xl',
        body: 'text-base',
        caption: 'text-sm',
      };
  }
};

// Responsive sidebar behavior
export const getSidebarBehavior = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        defaultCollapsed: true,
        canToggle: true,
        overlay: true,
        position: 'fixed' as const,
      };
    case 'md':
      return {
        defaultCollapsed: false,
        canToggle: true,
        overlay: false,
        position: 'relative' as const,
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        defaultCollapsed: false,
        canToggle: true,
        overlay: false,
        position: 'relative' as const,
      };
    default:
      return {
        defaultCollapsed: false,
        canToggle: true,
        overlay: false,
        position: 'relative' as const,
      };
  }
};

// Responsive table behavior
export const getTableBehavior = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        layout: 'stacked' as const,
        showColumns: 2,
        scrollable: true,
        compact: true,
      };
    case 'md':
      return {
        layout: 'horizontal' as const,
        showColumns: 4,
        scrollable: true,
        compact: false,
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        layout: 'horizontal' as const,
        showColumns: 6,
        scrollable: false,
        compact: false,
      };
    default:
      return {
        layout: 'horizontal' as const,
        showColumns: 4,
        scrollable: true,
        compact: false,
      };
  }
};

// Responsive chart dimensions
export const getChartDimensions = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        width: '100%',
        height: '200px',
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
      };
    case 'md':
      return {
        width: '100%',
        height: '250px',
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        width: '100%',
        height: '300px',
        margin: { top: 30, right: 30, bottom: 30, left: 30 },
      };
    default:
      return {
        width: '100%',
        height: '250px',
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
      };
  }
};

// Responsive navigation
export const getNavigationBehavior = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        type: 'hamburger' as const,
        showLabels: false,
        showIcons: true,
        position: 'bottom' as const,
      };
    case 'md':
      return {
        type: 'sidebar' as const,
        showLabels: true,
        showIcons: true,
        position: 'left' as const,
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        type: 'sidebar' as const,
        showLabels: true,
        showIcons: true,
        position: 'left' as const,
      };
    default:
      return {
        type: 'sidebar' as const,
        showLabels: true,
        showIcons: true,
        position: 'left' as const,
      };
  }
};

// Responsive form layout
export const getFormLayout = (screenSize: Breakpoint) => {
  switch (screenSize) {
    case 'xs':
    case 'sm':
      return {
        columns: 1,
        spacing: 'space-y-4',
        labelPosition: 'top' as const,
        inputSize: 'sm' as const,
      };
    case 'md':
      return {
        columns: 2,
        spacing: 'space-y-4',
        labelPosition: 'top' as const,
        inputSize: 'base' as const,
      };
    case 'lg':
    case 'xl':
    case '2xl':
      return {
        columns: 2,
        spacing: 'space-y-6',
        labelPosition: 'left' as const,
        inputSize: 'base' as const,
      };
    default:
      return {
        columns: 2,
        spacing: 'space-y-4',
        labelPosition: 'top' as const,
        inputSize: 'base' as const,
      };
  }
};
