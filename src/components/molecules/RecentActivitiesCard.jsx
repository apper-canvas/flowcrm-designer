import React from 'react'
      import Card from '@/components/molecules/Card'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const RecentActivitiesCard = ({ getRecentActivities }) => {
        return (
          <Card initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Text type="h3" className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Recent Activities</Text>
            <div className="space-y-4">
              {getRecentActivities().map((activity, index) => (
                <div key={activity?.id || index} className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon
                      name={activity?.type === 'call' ? 'Phone' : activity?.type === 'email' ? 'Mail' : 'Calendar'}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <Text type="p" className="text-sm font-medium text-surface-900 dark:text-surface-100">
                      {activity?.type?.charAt(0)?.toUpperCase() + activity?.type?.slice(1)} Activity
                    </Text>
                    <Text type="p" className="text-xs text-surface-600 dark:text-surface-400">
                      {activity?.notes || 'No notes'}
                    </Text>
                  </div>
                  <Text type="span" className="text-xs text-surface-500">
                    {activity?.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Unknown date'}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        )
      }

      export default RecentActivitiesCard