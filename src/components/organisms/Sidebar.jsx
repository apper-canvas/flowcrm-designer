import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import NavItem from '@/components/molecules/NavItem'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'

      const Sidebar = ({ navItems, activeTab, setActiveTab, darkMode, toggleDarkMode }) => {
        return (
          <div className="w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col">
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Icon name="Briefcase" className="text-white" size={24} />
                </div>
                <div>
                  <Text type="h1" className="text-xl font-bold text-surface-900 dark:text-surface-100">FlowCRM</Text>
                  <Text type="p" className="text-xs text-surface-600 dark:text-surface-400">Customer Management</Text>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navItems.map(item => (
                  <NavItem
                    key={item.id}
                    item={item}
                    activeTab={activeTab}
                    onClick={setActiveTab}
                  />
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-surface-200 dark:border-surface-700">
              <Button
                onClick={toggleDarkMode}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                variant="secondary"
              >
                <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
                <Text type="span" className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
              </Button>
            </div>
          </div>
        )
      }

      export default Sidebar