import React, { useState } from 'react'
      import { AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import ContactCard from '@/components/molecules/ContactCard'
      import Modal from '@/components/organisms/Modal'
      import Label from '@/components/atoms/Label'
      import Text from '@/components/atoms/Text'
      import contactService from '@/services/api/contactService'

      const ContactGrid = ({ data, onUpdate }) => {
        const [selectedItem, setSelectedItem] = useState(null)

        const handleDeleteItem = async (id) => {
          try {
            await contactService.delete(id)
            onUpdate(prev => prev.filter(item => item.id !== id))
            toast.success('Contact deleted successfully')
            setSelectedItem(null)
          } catch (error) {
            toast.error('Failed to delete item')
          }
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {data.map((contact, index) => (
                <ContactCard
                  key={contact?.id || index}
                  contact={contact}
                  index={index}
                  onClick={() => setSelectedItem(contact)}
                  onDelete={handleDeleteItem}
                />
              ))}
            </AnimatePresence>

            <Modal
              show={!!selectedItem}
              onClose={() => setSelectedItem(null)}
              title="Contact Details"
            >
              {selectedItem && (
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.name || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.email || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.phone || 'N/A'}</Text>
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Text type="p" className="text-surface-900 dark:text-surface-100">{selectedItem?.company || 'N/A'}</Text>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )
      }

      export default ContactGrid