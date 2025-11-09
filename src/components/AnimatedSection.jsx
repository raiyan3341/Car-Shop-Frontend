// src/components/AnimatedSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * 💫 AnimatedSection Component (Upgraded)
 * Smoothly animates its children into view with direction control, spring motion, and reusable props.
 *
 * Props:
 * - direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 * - duration: animation duration (default: 0.8s)
 * - delay: animation start delay
 * - once: if true, plays animation only once when it first comes into view
 * - scale: enable subtle zoom-in effect (default: true)
 */
const AnimatedSection = ({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  once = false,
  scale = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.2, // 20% visible → start animation
  });

  // Direction-based movement
  const directionVariants = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  };

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      ...directionVariants[direction],
      scale: scale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth easing
        type: 'spring',
        stiffness: 60,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
