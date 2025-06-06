import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', icon: IconComponent, ...props }) => {
        return (
          <div className="relative">
            {IconComponent && (
              <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={16} />
            )}
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`w-full ${IconComponent ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
              {...props}
            />
          </div>
        )
      }

      export default Input