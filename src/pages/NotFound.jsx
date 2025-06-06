import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <ApperIcon name="AlertTriangle" size={64} className="text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-surface-900 dark:text-surface-100">404</h1>
          <h2 className="text-xl font-semibold text-surface-700 dark:text-surface-300">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound