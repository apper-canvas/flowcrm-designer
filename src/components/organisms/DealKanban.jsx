import React, { useState } from 'react'
      import { AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import DealCard from '@/components/molecules/DealCard'
      import Modal from '@/components/organisms/Modal'
      import Label from '@/components/atoms/Label'
      import Text from '@/components/atoms/Text'
      import dealService from '@/services/api/dealService'

      const DealKanban = ({ data, onUpdate, contacts = [] }) => {
        const [selectedItem, setSelectedItem] = useState(null)
        const [draggedDeal, setDraggedDeal] = useState(null)

        const dealStages = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost']

        const handleDeleteItem = async (id) => {
          try {
            await dealService.delete(id)
            onUpdate(prev => prev.filter(item => item.id !== id))
            toast.success('Deal deleted successfully')
            setSelectedItem(null)
          } catch (error) {
            toast.error('Failed to delete item')
          }
        }

        const handleDragStart = (e, deal) => {
          setDraggedDeal(deal)
          e.dataTransfer.effectAllowed = 'move'
        }

        const handleDragOver = (e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        }

        const handleDrop = async (e, newStage) => {
          e.preventDefault()
          if (draggedDeal && draggedDeal.stage !== newStage) {
            try {
              const updatedDeal = await dealService.update(draggedDeal.id, { ...draggedDeal, stage: newStage })
              onUpdate(prev => prev.map(deal =>
                deal.id === draggedDeal.id ? updatedDeal : deal
              ))
              toast.success(`Deal moved to ${newStage}`)
            } catch (error) {
              toast.error('Failed to update deal stage')
            }
          }
          setDraggedDeal(null)
        }

        const getContactName = (contactId) => {
          const contact = contacts.find(c => c?.id === contactId)
          return contact?.name || 'Unknown Contact'
        }

        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {dealStages.map(stage => {
              const stageDeals = data.filter(deal => deal?.stage === stage) || []
              return (
                <div
                  key={stage}
                  className="bg-surface-100 dark:bg-surface-800 p-4 rounded-xl"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Text type="h3" className="font-semibold text-surface-900 dark:text-surface-100">{stage}</Text>
                    <Text type="span" className="px-2 py-1 bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 text-xs rounded-full">
                      {stageDeals.length}
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {stageDeals.map((deal, index) => (
                        <DealCard
                          key={deal?.id || index}
                          deal={deal}
                          index={index}
                          onDragStart={handleDragStart}
                          onClick={setSelectedItem}
                          onDelete={handleDeleteItem}
                          getContactName={getContactName}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}

            <Modal
              show={!!selectedItem}
              onClose={() => setSelectedItem(null)}
              title="Deal Details"
            >
              {selectedItem && (
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.title || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">${(selectedItem?.value || 0).toLocaleString()}</Text>
                  </div>
                  <div>
                    <Label>Stage</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.stage || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Contact</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{getContactName(selectedItem?.contactId)}</Text>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )
      }

      export default DealKanban