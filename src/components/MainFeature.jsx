import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const MainFeature = ({ type, data, onUpdate, contacts = [], deals = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [draggedDeal, setDraggedDeal] = useState(null)
  const [expandedActivity, setExpandedActivity] = useState(null)

  const dealStages = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost']

  const handleDeleteItem = async (id) => {
    try {
      if (type === 'contacts') {
        await contactService.delete(id)
        onUpdate(prev => prev.filter(item => item.id !== id))
        toast.success('Contact deleted successfully')
      } else if (type === 'deals') {
        await dealService.delete(id)
        onUpdate(prev => prev.filter(item => item.id !== id))
        toast.success('Deal deleted successfully')
      } else if (type === 'activities') {
        await activityService.delete(id)
        onUpdate(prev => prev.filter(item => item.id !== id))
        toast.success('Activity deleted successfully')
      }
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

  const getDealTitle = (dealId) => {
    const deal = deals.find(d => d?.id === dealId)
    return deal?.title || 'Unknown Deal'
  }

  const renderContacts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {data.map((contact, index) => (
          <motion.div
            key={contact?.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card hover:shadow-soft transition-all cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedItem(contact)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {contact?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                    {contact?.name || 'Unknown Name'}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {contact?.company || 'No company'}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteItem(contact?.id)
                }}
                className="p-2 text-surface-400 hover:text-red-500 transition-colors"
              >
                <ApperIcon name="Trash2" size={16} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <ApperIcon name="Mail" size={14} />
                <span>{contact?.email || 'No email'}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                <ApperIcon name="Phone" size={14} />
                <span>{contact?.phone || 'No phone'}</span>
              </div>
            </div>
            {contact?.tags && contact.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {contact.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  const renderDeals = () => (
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
              <h3 className="font-semibold text-surface-900 dark:text-surface-100">{stage}</h3>
              <span className="px-2 py-1 bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 text-xs rounded-full">
                {stageDeals.length}
              </span>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {stageDeals.map((deal, index) => (
                  <motion.div
                    key={deal?.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal)}
                    className="bg-white dark:bg-surface-700 p-4 rounded-lg shadow-card cursor-move hover:shadow-soft transition-all"
                    onClick={() => setSelectedItem(deal)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-surface-900 dark:text-surface-100 text-sm">
                        {deal?.title || 'Untitled Deal'}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteItem(deal?.id)
                        }}
                        className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                      >
                        <ApperIcon name="X" size={12} />
                      </button>
                    </div>
                    <p className="text-lg font-bold text-primary mb-2">
                      ${(deal?.value || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      {getContactName(deal?.contactId)}
                    </p>
                    {deal?.expectedClose && (
                      <p className="text-xs text-surface-500 mt-1">
                        Expected: {new Date(deal.expectedClose).toLocaleDateString()}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderActivities = () => (
    <div className="space-y-4">
      <AnimatePresence>
        {data.map((activity, index) => (
          <motion.div
            key={activity?.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ApperIcon 
                    name={activity?.type === 'call' ? 'Phone' : activity?.type === 'email' ? 'Mail' : 'Calendar'} 
                    size={20} 
                    className="text-primary"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                      {activity?.type?.charAt(0)?.toUpperCase() + activity?.type?.slice(1)} Activity
                    </h3>
                    <span className="text-xs text-surface-500 bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">
                      {activity?.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Unknown date'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                    <p><strong>Contact:</strong> {getContactName(activity?.contactId)}</p>
                    {activity?.dealId && (
                      <p><strong>Deal:</strong> {getDealTitle(activity?.dealId)}</p>
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedActivity === activity?.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                      >
                        <p className="text-sm text-surface-700 dark:text-surface-300">
                          <strong>Notes:</strong> {activity?.notes || 'No notes available'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpandedActivity(
                    expandedActivity === activity?.id ? null : activity?.id
                  )}
                  className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  <ApperIcon 
                    name={expandedActivity === activity?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </button>
                <button
                  onClick={() => handleDeleteItem(activity?.id)}
                  className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="space-y-6">
      {type === 'contacts' && renderContacts()}
      {type === 'deals' && renderDeals()}
      {type === 'activities' && renderActivities()}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glassmorphism rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  {type === 'contacts' ? 'Contact Details' : type === 'deals' ? 'Deal Details' : 'Activity Details'}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {type === 'contacts' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Company</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.company || 'N/A'}</p>
                    </div>
                  </>
                )}

                {type === 'deals' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Title</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.title || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Value</label>
                      <p className="text-surface-900 dark:text-surface-100">${(selectedItem?.value || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Stage</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.stage || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Contact</label>
                      <p className="text-surface-900 dark:text-surface-100">{getContactName(selectedItem?.contactId)}</p>
                    </div>
                  </>
                )}

                {type === 'activities' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Type</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.type || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Contact</label>
                      <p className="text-surface-900 dark:text-surface-100">{getContactName(selectedItem?.contactId)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Notes</label>
                      <p className="text-surface-900 dark:text-surface-100">{selectedItem?.notes || 'No notes'}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature