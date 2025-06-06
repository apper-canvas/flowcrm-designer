import React from 'react'

      const Button = ({ children, onClick, className, variant = 'primary', icon: IconComponent, iconSize = 16, ...props }) => {
        const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
        const variants = {
          primary: "bg-primary text-white hover:bg-primary-dark",
          accent: "bg-accent text-white hover:bg-accent/90",
          secondary: "text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200",
          outline: "border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700",
        }

        return (
          <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
          >
            {IconComponent && <IconComponent size={iconSize} />}
            <span>{children}</span>
          </button>
        )
      }

      export default Button