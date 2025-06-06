import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const ContactCard = ({ contact, index, onClick, onDelete }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card hover:shadow-soft transition-all cursor-pointer transform hover:scale-105"
            onClick={onClick}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Text type="span" className="text-white font-bold text-lg">
                    {contact?.name?.charAt(0)?.toUpperCase() || '?'}
                  </Text>
                </div>
                <div>
                  <Text type="h3" className="font-semibold text-surface-900 dark:text-surface-100">
                    {contact?.name || 'Unknown Name'}
                  </Text>
                  <Text type="p" className="text-sm text-surface-600 dark:text-surface-400">
                    {contact?.company || 'No company'}
                  </Text>
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(contact?.id)
                }}
                className="p-2 text-surface-400 hover:text-red-500"
                variant="secondary"
                icon={Icon}
                iconSize={16}
                name="Trash2"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <Icon name="Mail" size={14} />
                <Text type="span">{contact?.email || 'No email'}</Text>
              </div>
              <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <Icon name="Phone" size={14} />
                <Text type="span">{contact?.phone || 'No phone'}</Text>
              </div>
            </div>
            {contact?.tags && contact.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {contact.tags.map((tag, tagIndex) => (
                  <Text
                    type="span"
                    key={tagIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </Text>
                ))}
              </div>
            )}
          </motion.div>
        )
      }

      export default ContactCard