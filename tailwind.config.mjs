/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['"Playfair Display"', 'Georgia', 'serif'],
      serif: ['"Playfair Display"', 'Georgia', 'serif'],
      ui: ['"DM Sans"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      canvas:   '#F3F0E7',
      ink:      '#222722',
      forest:   '#174C3B',
      sage:     '#A9B7A5',
      rust:     '#B65F45',
      gold:     '#C49A45',
      // functional tones
      'ink-60':    'rgba(34,39,34,0.60)',
      'ink-30':    'rgba(34,39,34,0.30)',
      'ink-12':    'rgba(34,39,34,0.12)',
      'forest-10': 'rgba(23,76,59,0.10)',
      'sage-30':   'rgba(169,183,165,0.30)',
    },
    extend: {
      maxWidth: {
        prose: '68ch',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      lineHeight: {
        'display': '1.08',
        'snug': '1.25',
        'read': '1.75',
      },
      letterSpacing: {
        'widest': '0.18em',
        'wide': '0.08em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
