import React from 'react'
      import Card from '@/components/molecules/Card'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const DashboardStatCard = ({ title, value, icon, iconBgClass, iconClass, delay }) => {
        return (
          <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay }}>
            <div className="flex items-center justify-between">
              <div>
                <Text type="p" className="text-sm font-medium text-surface-600 dark:text-surface-400">{title}</Text>
                <Text type="p" className="text-3xl font-bold text-surface-900 dark:text-surface-100">{value}</Text>
              </div>
              <div className={`p-3 rounded-lg ${iconBgClass}`}>
                <Icon name={icon} className={iconClass} size={24} />
              </div>
            </div>
          </Card>
        )
      }

      export default DashboardStatCard