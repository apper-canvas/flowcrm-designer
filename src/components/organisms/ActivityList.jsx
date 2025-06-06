import React, { useState } from 'react'
      import { AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import ActivityCard from '@/components/molecules/ActivityCard'
      import Modal from '@/components/organisms/Modal'
      import Label from '@/components/atoms/Label'
      import Text from '@/components/atoms/Text'
      import activityService from '@/services/api/activityService'

      const ActivityList = ({ data, onUpdate, contacts = [], deals = [] }) => {
        const [selectedItem, setSelectedItem] = useState(null)
        const [expandedActivity, setExpandedActivity] = useState(null)

        const handleDeleteItem = async (id) => {
          try {
            await activityService.delete(id)
            onUpdate(prev => prev.filter(item => item.id !== id))
            toast.success('Activity deleted successfully')
            setSelectedItem(null)
          } catch (error) {
            toast.error('Failed to delete item')
          }
        }

        const getContactName = (contactId) => {
          const contact = contacts.find(c => c?.id === contactId)
          return contact?.name || 'Unknown Contact'
        }

        const getDealTitle = (dealId) => {
          const deal = deals.find(d => d?.id === dealId)
          return deal?.title || 'Unknown Deal'
        }

        return (
          <div className="space-y-4">
            <AnimatePresence>
              {data.map((activity, index) => (
                <ActivityCard
                  key={activity?.id || index}
                  activity={activity}
                  index={index}
                  onExpandToggle={() => setExpandedActivity(
                    expandedActivity === activity?.id ? null : activity?.id
                  )}
                  isExpanded={expandedActivity === activity?.id}
                  onDelete={() => handleDeleteItem(activity?.id)}
                  getContactName={getContactName}
                  getDealTitle={getDealTitle}
                />
              ))}
            </AnimatePresence>

            <Modal
              show={!!selectedItem}
              onClose={() => setSelectedItem(null)}
              title="Activity Details"
            >
              {selectedItem && (
                <div className="space-y-4">
                  <div>
                    <Label>Type</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.type || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Contact</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{getContactName(selectedItem?.contactId)}</Text>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.notes || 'No notes'}</Text>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )
      }

      export default ActivityList