import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const NavItem = ({ item, activeTab, onClick }) => {
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onClick(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
              isActive
                ? 'bg-primary text-white shadow-lg'
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={item.icon} size={20} className={isActive ? 'text-white' : ''} />
              <Text type="span" className="font-medium">{item.label}</Text>
            </div>
            {item.count !== null && (
              <Text type="span" className={`px-2 py-1 rounded-full text-xs font-bold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300'
              }`}>
                {item.count}
              </Text>
            )}
          </button>
        )
      }

      export default NavItem