import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useSocket } from '../../contexts/SocketContext'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { appointmentsAPI, patientsAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  Mail,
  LogOut,
  Menu,
  X,
  Edit,
  Save
} from 'lucide-react'

const PatientDashboard = () => {
  const { user, logout } = useAuth()
  const { connected } = useSocket()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [activeTab, setActiveTab] = useState('appointments')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    emergencyContact: { name: '', phone: '', relation: '' }
  })

  useEffect(() => {
    const init = async () => {
      await fetchAppointments()
      await fetchProfile()
      setLoading(false)
    }
    init()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsAPI.getByPatient(user.id)
      if (response.data.success) {
        setAppointments(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setAppointments([])
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await patientsAPI.getById(user.id)
      if (response.data.success) {
        const data = response.data.data
        setProfileData({
          name: data.User?.name || '',
          email: data.User?.email || '',
          phone: data.User?.phone || '',
          age: data.age || '',
          gender: data.gender || '',
          bloodGroup: data.bloodGroup || '',
          emergencyContact: data.emergencyContact || { name: '', phone: '', relation: '' }
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const response = await patientsAPI.update(user.id, profileData)
      if (response.data.success) {
        toast.success('Profile updated successfully')
        setIsEditing(false)
        await fetchProfile()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await appointmentsAPI.updateStatus(appointmentId, 'cancelled')
      if (response.data.success) {
        toast.success('Appointment cancelled successfully')
        await fetchAppointments()
        
        if (showAppointmentModal) {
          setShowAppointmentModal(false)
          setSelectedAppointment(null)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100'
      case 'approved': return 'text-green-700 bg-green-100'
      case 'rejected': return 'text-red-700 bg-red-100'
      case 'completed': return 'text-blue-700 bg-blue-100'
      case 'cancelled': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDF6F9]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EDF6F9]">
      <header className="bg-white shadow-md border-b border-[#83C5BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Toggle Menu"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="ml-4 text-xl font-extrabold text-[#006D77]">
                Patient Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{connected ? 'Connected' : 'Disconnected'}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#006D77]">
                  <span className="text-white text-base font-medium">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 lg:border-r border-[#83C5BE]`}>
          <div className="flex items-center justify-between h-16 px-6 border-b lg:hidden">
            <h2 className="text-lg font-bold text-[#006D77]">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('appointments'); setSidebarOpen(false) }}
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition duration-200 ${
                  activeTab === 'appointments' ? 'bg-[#006D77] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                My Appointments
              </button>
              <button
                onClick={() => { setActiveTab('profile'); setSidebarOpen(false) }}
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition duration-200 ${
                  activeTab === 'profile' ? 'bg-[#006D77] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'appointments' ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  Welcome back, <span className="text-[#006D77]">{user?.name}</span>!
                </h2>
                <p className="text-gray-600">
                  Your comprehensive health management starts here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
                  <a href="/appointment" className="block">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-[#83C5BE]">
                        <Calendar className="h-7 w-7 text-[#006D77]" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">New Appointment</p>
                        <p className="text-xl font-bold text-gray-900">Schedule Now</p>
                      </div>
                    </div>
                  </a>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-red-100">
                      <Phone className="h-7 w-7 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Emergency</p>
                      <p className="text-xl font-bold text-gray-900">Call 108</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100">
                      <Mail className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Support</p>
                      <p className="text-xl font-bold text-gray-900">Get Help</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">My Appointments</h3>
                </div>
                
                <div className="overflow-x-auto">
                  {appointments.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-base font-semibold text-gray-900">No appointments scheduled</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Book your first appointment to view it here.
                      </p>
                      <a href="/appointment" className="mt-4 inline-block">
                        <button className="bg-[#006D77] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005662] transition-colors">
                          Book Appointment
                        </button>
                      </a>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="p-4 hover:bg-gray-50 transition duration-150 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between">
                          <div className="flex items-center space-x-4 mb-3 md:mb-0">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#83C5BE]">
                              <User className="h-6 w-6 text-[#006D77]" />
                            </div>
                            <div>
                              <p className="text-base font-semibold text-gray-900">
                                Dr. {appointment.Doctor?.User?.name || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.Doctor?.specialization || 'General'}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(appointment.date).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center space-x-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} mr-2`}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1 capitalize">{appointment.status}</span>
                            </span>
                            
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment)
                                setShowAppointmentModal(true)
                              }}
                              className="px-4 py-2 text-sm font-medium rounded-lg border border-[#006D77] text-[#006D77] hover:bg-[#006D77] hover:text-white transition-colors my-1"
                            >
                              View Details
                            </button>
                            
                            {(appointment.status === 'pending' || appointment.status === 'approved') && (
                              <button
                                onClick={() => cancelAppointment(appointment.id)}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors my-1"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">My Profile</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-[#006D77] text-white rounded-lg hover:bg-[#005662] transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        fetchProfile()
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                  <input
                    type="text"
                    value={profileData.bloodGroup}
                    onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}
                    disabled={!isEditing}
                    placeholder="e.g., A+, B-, O+"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={profileData.emergencyContact.name}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, name: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.emergencyContact.phone}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Relation</label>
                    <input
                      type="text"
                      value={profileData.emergencyContact.relation}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        emergencyContact: {...profileData.emergencyContact, relation: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="e.g., Father, Mother, Spouse"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => {
                  setShowAppointmentModal(false)
                  setSelectedAppointment(null)
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                aria-label="Close Modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#EDF6F9]">
                <p className="text-sm font-semibold text-gray-500">Doctor</p>
                <p className="text-base font-medium text-gray-900">Dr. {selectedAppointment.Doctor?.User?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{selectedAppointment.Doctor?.specialization || 'General'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                  <p className="text-sm text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-500">Time</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.time}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500">Reason</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAppointment.reason}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="ml-1 capitalize">{selectedAppointment.status}</span>
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
              {(selectedAppointment.status === 'pending' || selectedAppointment.status === 'approved') && (
                <button
                  onClick={() => cancelAppointment(selectedAppointment.id)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDashboard