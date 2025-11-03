import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../ui/LoadingSpinner'

const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoute = user?.role === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient'
    return <Navigate to={dashboardRoute} replace />
  }

  return children
}

export default PublicRoute