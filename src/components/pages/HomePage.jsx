import React, { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import { AnimatePresence } from 'framer-motion'
      import Sidebar from '@/components/organisms/Sidebar'
      import Header from '@/components/organisms/Header'
      import Modal from '@/components/organisms/Modal'
      import DashboardOverview from '@/components/organisms/DashboardOverview'
      import ContactGrid from '@/components/organisms/ContactGrid'
      import DealKanban from '@/components/organisms/DealKanban'
      import ActivityList from '@/components/organisms/ActivityList'
      import contactService from '@/services/api/contactService'
      import dealService from '@/services/api/dealService'
      import activityService from '@/services/api/activityService'

      const HomePage = () => {
        const [darkMode, setDarkMode] = useState(false)
        const [activeTab, setActiveTab] = useState('dashboard')
        const [contacts, setContacts] = useState([])
        const [deals, setDeals] = useState([])
        const [activities, setActivities] = useState([])
        const [loading, setLoading] = useState(false)
        const [searchQuery, setSearchQuery] = useState('')
        const [showModal, setShowModal] = useState(false)
        const [modalType, setModalType] = useState('')

        useEffect(() => {
          const loadData = async () => {
            setLoading(true)
            try {
              const [contactsData, dealsData, activitiesData] = await Promise.all([
                contactService.getAll(),
                dealService.getAll(),
                activityService.getAll()
              ])
              setContacts(contactsData || [])
              setDeals(dealsData || [])
              setActivities(activitiesData || [])
            } catch (error) {
              toast.error('Failed to load data')
            } finally {
              setLoading(false)
            }
          }
          loadData()
        }, [])

        useEffect(() => {
          if (darkMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }, [darkMode])

        const filteredContacts = contacts.filter(contact =>
          contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact?.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact?.email?.toLowerCase().includes(searchQuery.toLowerCase())
        )

        const getDealsByStage = (stage) => {
          return deals.filter(deal => deal?.stage === stage) || []
        }

        const getTotalPipelineValue = () => {
          return deals.reduce((total, deal) => total + (deal?.value || 0), 0)
        }

        const getRecentActivities = () => {
          return activities
            .sort((a, b) => new Date(b?.timestamp || 0) - new Date(a?.timestamp || 0))
            .slice(0, 5)
        }

        const navItems = [
          { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', count: null },
          { id: 'contacts', label: 'Contacts', icon: 'Users', count: contacts.length },
          { id: 'deals', label: 'Deals', icon: 'DollarSign', count: deals.length },
          { id: 'activities', label: 'Activities', icon: 'Calendar', count: activities.length }
        ]

        const openModal = (type) => {
          setModalType(type)
          setShowModal(true)
        }

        const handleConfirmAdd = () => {
          // In a full implementation, this would contain a form to add new item
          toast.success(`${modalType === 'contact' ? 'Contact' : 'Deal'} would be added in full version`)
          setShowModal(false)
        }

        return (
          <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900">
            <Sidebar
              navItems={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
            />

            <div className="flex-1 flex flex-col">
              <Header
                activeTab={activeTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddContact={() => openModal('contact')}
                onAddDeal={() => openModal('deal')}
              />

              <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                      <DashboardOverview
                        contacts={contacts}
                        deals={deals}
                        activities={activities}
                        getTotalPipelineValue={getTotalPipelineValue}
                        getDealsByStage={getDealsByStage}
                        getRecentActivities={getRecentActivities}
                      />
                    )}
                    {activeTab === 'contacts' && (
                      <ContactGrid
                        data={filteredContacts}
                        onUpdate={setContacts}
                      />
                    )}
                    {activeTab === 'deals' && (
                      <DealKanban
                        data={deals}
                        onUpdate={setDeals}
                        contacts={contacts}
                      />
                    )}
                    {activeTab === 'activities' && (
                      <ActivityList
                        data={activities}
                        onUpdate={setActivities}
                        contacts={contacts}
                        deals={deals}
                      />
                    )}
                  </AnimatePresence>
                )}
              </main>
            </div>

            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              title={`Add New ${modalType === 'contact' ? 'Contact' : 'Deal'}`}
              confirmText={`Add ${modalType === 'contact' ? 'Contact' : 'Deal'}`}
              onConfirm={handleConfirmAdd}
            >
              <p className="text-surface-600 dark:text-surface-400">
                This is a demo modal. In a full implementation, this would contain a form to add new {modalType}s.
              </p>
            </Modal>
          </div>
        )
      }

      export default HomePage