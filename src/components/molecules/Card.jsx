import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', initial = { opacity: 0, y: 20 }, animate = { opacity: 1, y: 0 }, transition, onClick, ...props }) => {
        return (
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            className={`bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card ${className}`}
            onClick={onClick}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card