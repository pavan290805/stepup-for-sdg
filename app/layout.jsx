import './globals.css';

export const metadata = {
  title: 'UNITE 2030 | StepUp for SDG - Shaping Global Communities',
  description: 'StepUp for SDG - Empowering students and communities through the Sustainable Development Goals. Delivering sustainable educational models and NGO alignment.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F8FBFF] text-[#071B4A] font-manrope selection:bg-[#0A5BFF] selection:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
