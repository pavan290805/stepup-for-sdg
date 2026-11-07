import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { partnerLogos } from '../../utils/partnerData';
import ColorAccentLine from '../common/ColorAccentLine';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function PartnersMarquee() {
  const scrollRef = useRef(null);
  /* Triple the logos for a seamless infinite loop */
  const logos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return null;
}
