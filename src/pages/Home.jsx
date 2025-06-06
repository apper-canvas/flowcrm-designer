import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const Home = () => {
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

  const dealStages = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost']

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  const handleAddContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData)
      setContacts(prev => [...prev, newContact])
      setShowModal(false)
      toast.success('Contact added successfully')
    } catch (error) {
      toast.error('Failed to add contact')
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Total Contacts</p>
              <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">{contacts.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <ApperIcon name="Users" className="text-primary" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Active Deals</p>
              <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">{deals.length}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <ApperIcon name="DollarSign" className="text-accent" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Pipeline Value</p>
              <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                ${getTotalPipelineValue().toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <ApperIcon name="TrendingUp" className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-600 dark:text-surface-400">Activities</p>
              <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">{activities.length}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <ApperIcon name="Calendar" className="text-orange-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {getRecentActivities().map((activity, index) => (
              <div key={activity?.id || index} className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ApperIcon 
                    name={activity?.type === 'call' ? 'Phone' : activity?.type === 'email' ? 'Mail' : 'Calendar'} 
                    size={16} 
                    className="text-primary"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    {activity?.type?.charAt(0)?.toUpperCase() + activity?.type?.slice(1)} Activity
                  </p>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    {activity?.notes || 'No notes'}
                  </p>
                </div>
                <span className="text-xs text-surface-500">
                  {activity?.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Unknown date'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-card"
        >
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Pipeline Overview</h3>
          <div className="space-y-3">
            {dealStages.map(stage => {
              const stageDeals = getDealsByStage(stage)
              const stageValue = stageDeals.reduce((sum, deal) => sum + (deal?.value || 0), 0)
              return (
                <div key={stage} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{stage}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-surface-900 dark:text-surface-100">
                      {stageDeals.length} deals
                    </span>
                    <p className="text-xs text-surface-600 dark:text-surface-400">
                      ${stageValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <ApperIcon name="Briefcase" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-900 dark:text-surface-100">FlowCRM</h1>
              <p className="text-xs text-surface-600 dark:text-surface-400">Customer Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ApperIcon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-surface-200 dark:border-surface-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <ApperIcon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 capitalize">
                {activeTab}
              </h2>
              {activeTab !== 'dashboard' && (
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => openModal('contact')}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                <span>Add Contact</span>
              </button>
              <button
                onClick={() => openModal('deal')}
                className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'contacts' && (
                <MainFeature 
                  type="contacts"
                  data={filteredContacts}
                  onUpdate={setContacts}
                />
              )}
              {activeTab === 'deals' && (
                <MainFeature 
                  type="deals"
                  data={deals}
                  onUpdate={setDeals}
                  contacts={contacts}
                />
              )}
              {activeTab === 'activities' && (
                <MainFeature 
                  type="activities"
                  data={activities}
                  onUpdate={setActivities}
                  contacts={contacts}
                  deals={deals}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glassmorphism rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  Add New {modalType === 'contact' ? 'Contact' : 'Deal'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={16} />
                </button>
              </div>
              <p className="text-surface-600 dark:text-surface-400">
                This is a demo modal. In a full implementation, this would contain a form to add new {modalType}s.
              </p>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success(`${modalType === 'contact' ? 'Contact' : 'Deal'} would be added in full version`)
                    setShowModal(false)
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Add {modalType === 'contact' ? 'Contact' : 'Deal'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home