/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A5BFF',
          navy: '#071B4A',
          sky: '#42A5FF',
          purple: '#8C7CFF',
          green: '#22C55E',
          orange: '#FF9800',
          bg: '#F8FBFF',
          lightBlue: '#EBF3FF',
          cardBg: 'rgba(255, 255, 255, 0.85)',
          glowBlue: 'rgba(10, 91, 255, 0.15)',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Legacy aliases (kept for backward compat)
        poppins: ['Manrope', 'sans-serif'],
        inter:   ['Manrope', 'sans-serif'],
        script:  ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        // --- Headings ---
        'hero':    ['72px', { lineHeight: '84px', fontWeight: '800' }],  // Hero Title
        'h1':      ['56px', { lineHeight: '68px', fontWeight: '700' }],  // Page Heading
        'h2':      ['48px', { lineHeight: '60px', fontWeight: '700' }],  // Section Heading
        'h3':      ['36px', { lineHeight: '48px', fontWeight: '600' }],  // Sub Heading
        'h4':      ['30px', { lineHeight: '40px', fontWeight: '600' }],  // Card Heading
        'h5':      ['24px', { lineHeight: '34px', fontWeight: '600' }],  // Small Heading
        'h6':      ['20px', { lineHeight: '30px', fontWeight: '600' }],  // Mini Heading
        // --- Body ---
        'body-lg': ['20px', { lineHeight: '34px', fontWeight: '400' }],  // Body Large
        'body-md': ['18px', { lineHeight: '30px', fontWeight: '400' }],  // Body
        'body-sm': ['16px', { lineHeight: '28px', fontWeight: '400' }],  // Body Small
        'caption':  ['14px', { lineHeight: '22px', fontWeight: '400' }], // Caption
        'label':    ['12px', { lineHeight: '18px', fontWeight: '500' }], // Label / PROJECT 01
        // --- UI ---
        'nav':      ['16px', { lineHeight: '24px', fontWeight: '500' }], // Navbar
        'nav-active':['16px',{ lineHeight: '24px', fontWeight: '700' }], // Active Navbar
        'btn':      ['16px', { lineHeight: '24px', fontWeight: '600' }], // Buttons
        // --- Stats ---
        'stat-num': ['56px', { lineHeight: '64px', fontWeight: '800' }], // Statistics Number
        'stat-lbl': ['18px', { lineHeight: '28px', fontWeight: '500' }], // Statistics Label
        'proj-num': ['12px', { lineHeight: '18px', fontWeight: '500' }], // Project Number
        // --- Footer ---
        'footer-heading': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'footer-link':    ['16px', { lineHeight: '28px', fontWeight: '400' }],
        // --- Serif / Italic (Cormorant Garamond) ---
        'tagline':  ['30px', { lineHeight: '40px', fontWeight: '400' }], // Hero Tagline
        'quote':    ['26px', { lineHeight: '38px', fontWeight: '400' }], // Quote / Motto
        'slogan':   ['28px', { lineHeight: '40px', fontWeight: '400' }], // Campaign Slogan
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(7, 27, 74, 0.08), 0 0 15px rgba(66, 165, 255, 0.05)',
        'glass-hover': '0 30px 60px -12px rgba(10, 91, 255, 0.18), 0 0 25px rgba(10, 91, 255, 0.12)',
        'card-glow': '0 0 30px rgba(10, 91, 255, 0.25)',
        'pill': '0 10px 25px -5px rgba(10, 91, 255, 0.4)',
        'soft': '0 10px 30px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'spin-slow': 'spin 25s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.15)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333333%)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
