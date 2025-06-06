import React from 'react'
      import SearchInput from '@/components/molecules/SearchInput'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const Header = ({ activeTab, searchQuery, setSearchQuery, onAddContact, onAddDeal }) => {
        return (
          <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Text type="h2" className="text-2xl font-bold text-surface-900 dark:text-surface-100 capitalize">
                  {activeTab}
                </Text>
                {activeTab !== 'dashboard' && (
                  <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                )}
              </div>
              <div className="flex items-center space-x-3">
                <Button onClick={onAddContact} variant="primary">
                  <Icon name="Plus" size={16} />
                  <span>Add Contact</span>
                </Button>
                <Button onClick={onAddDeal} variant="accent">
                  <Icon name="Plus" size={16} />
                  <span>Add Deal</span>
                </Button>
              </div>
            </div>
          </header>
        )
      }

      export default Header