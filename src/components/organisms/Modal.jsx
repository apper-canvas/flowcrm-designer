import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const Modal = ({ show, onClose, title, children, confirmText, onConfirm, showActions = true }) => {
        if (!show) return null

        return (
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glassmorphism rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Text type="h3" className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                      {title}
                    </Text>
                    <Button
                      onClick={onClose}
                      className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700"
                      variant="secondary"
                      icon={Icon}
                      iconSize={16}
                      name="X"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                  {children}
                  {showActions && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <Button onClick={onClose} variant="secondary">
                        Cancel
                      </Button>
                      <Button onClick={onConfirm} variant="primary">
                        {confirmText}
                      </Button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }

      export default Modal