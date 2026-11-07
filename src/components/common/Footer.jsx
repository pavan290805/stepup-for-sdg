import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const QUICK_LINKS = [
  { label: 'Home', target: '/#home' },
  { label: 'About', target: '/#about' },
  { label: 'Impact', target: '/#impact' },
  { label: 'Our Work', target: '/#our-work' },
  { label: 'SDG Goals', target: '/#sdg-goals' },
  { label: 'Partners', target: '/#partners' },
  { label: 'Contact', target: '/#contact' },
];

const SERVE_LINKS = [
  { label: 'Companies', path: '/work-with-us/corporate' },
  { label: 'Schools', path: '/work-with-us/schools' },
  { label: 'NGOs', path: '/work-with-us/ngos' },
  { label: 'Volunteers', path: '/work-with-us/volunteers' },
  { label: 'Universities', path: '/work-with-us/schools' },
  { label: 'Colleges', path: '/work-with-us/schools' },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-[rgba(240,247,255,0.9)] relative font-poppins">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={1}
        className="max-w-7xl mx-auto px-6 py-6 relative z-10"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Link href="/">
                <img src="/SDG_LOGO-removebg-preview.png" alt="StepUp For SDG" className="h-12 w-12 object-contain" />
              </Link>
            </div>

            <div>
              <div className="text-sm font-semibold text-[#071B4A]">StepUp for SDG</div>
              <div className="text-xs text-[#374151]">Educating Students.<br />Creating Sustainable Impact.</div>
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="hidden md:flex items-center gap-6 text-sm text-[#0B254B]">
            <a href="mailto:info@stepupforsdg.org" className="flex items-center gap-2 hover:text-[#0A5BFF] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" /></svg>
              info@stepupforsdg.org
            </a>
            <div className="h-6 border-l border-slate-200" />
            <a href="tel:+91 83410 11206" className="flex items-center gap-2 hover:text-[#0A5BFF] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 5.25v1.5z" /></svg>
              +91 83410 11206
            </a>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/stepup-for-sdg/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0B59FF]"
            >
              <FaLinkedinIn />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/stepup_for_sdg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0B59FF]"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Thin divider */}
        <div className="mt-6 border-t border-slate-200" />

        {/* Bottom copyright */}
        <div className="mt-4 text-center text-sm text-[#374151]">
          © 2026 <span className="text-[#0B59FF] font-semibold">Pavdhan Foundation</span>. All rights reserved.
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
