import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
    threshold: 0.2,
  });


  const directionVariants = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  };

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
        ease: [0.25, 0.1, 0.25, 1],
        type: 'spring',
        stiffness: 70,
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
