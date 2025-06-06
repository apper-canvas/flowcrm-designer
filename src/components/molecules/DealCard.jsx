import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const DealCard = ({ deal, index, onDragStart, onClick, onDelete, getContactName }) => {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            draggable
            onDragStart={(e) => onDragStart(e, deal)}
            className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-card cursor-move hover:shadow-soft transition-all"
            onClick={() => onClick(deal)}
          >
            <div className="flex items-start justify-between mb-2">
              <Text type="h4" className="font-medium text-surface-900 dark:text-surface-100 text-sm">
                {deal?.title || 'Untitled Deal'}
              </Text>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(deal?.id)
                }}
                className="p-1 text-surface-400 hover:text-red-500"
                variant="secondary"
                icon={Icon}
                iconSize={12}
                name="X"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
            <Text type="p" className="text-lg font-bold text-primary mb-2">
              ${(deal?.value || 0).toLocaleString()}
            </Text>
            <Text type="p" className="text-xs text-surface-600 dark:text-surface-400">
              {getContactName(deal?.contactId)}
            </Text>
            {deal?.expectedClose && (
              <Text type="p" className="text-xs text-surface-500 mt-1">
                Expected: {new Date(deal.expectedClose).toLocaleDateString()}
              </Text>
            )}
          </motion.div>
        )
      }

      export default DealCard