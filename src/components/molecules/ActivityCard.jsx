import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'

      const ActivityCard = ({ activity, onExpandToggle, isExpanded, onDelete, getContactName, getDealTitle, index }) => {
        const activityIcon = activity?.type === 'call' ? 'Phone' : activity?.type === 'email' ? 'Mail' : 'Calendar'

        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name={activityIcon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Text type="h3" className="font-semibold text-surface-900 dark:text-surface-100">
                      {activity?.type?.charAt(0)?.toUpperCase() + activity?.type?.slice(1)} Activity
                    </Text>
                    <Text type="span" className="text-xs text-surface-500 bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">
                      {activity?.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Unknown date'}
                    </Text>
                  </div>
                  <div className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                    <Text type="p"><strong>Contact:</strong> {getContactName(activity?.contactId)}</Text>
                    {activity?.dealId && (
                      <Text type="p"><strong>Deal:</strong> {getDealTitle(activity?.dealId)}</Text>
                    )}
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                      >
                        <Text type="p" className="text-sm text-surface-700 dark:text-surface-300">
                          <strong>Notes:</strong> {activity?.notes || 'No notes available'}
                        </Text>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onExpandToggle}
                  className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                  variant="secondary"
                  icon={isExpanded ? Icon : Icon}
                  iconSize={16}
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                >
                  <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </Button>
                <Button
                  onClick={onDelete}
                  className="p-2 text-surface-400 hover:text-red-500"
                  variant="secondary"
                  icon={Icon}
                  iconSize={16}
                  name="Trash2"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )
      }

      export default ActivityCard