import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  
  // Fixed forgot password methods
  forgotPassword: (email) => api.post('/auth/forgot-password', { email: email.trim() }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { 
    email: email.trim(), 
    otp: otp.toString().trim() 
  }),
  resetPassword: (email, otp, newPassword) => api.post('/auth/reset-password', { 
    email: email.trim(), 
    otp: otp.toString().trim(), 
    newPassword 
  }),
}

export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  update: (id, data) => api.put(`/doctors/${id}/profile`, data),
  updateAvailability: (id, availability) => api.put(`/doctors/${id}/availability`, { availability }),
}

export const patientsAPI = {
  getById: (id) => api.get(`/patients/profile/${id}`),
  update: (id, data) => api.put(`/patients/profile/${id}`, data),
  getMedicalHistory: (id) => api.get(`/patients/history/${id}`),
}

export const appointmentsAPI = {
  create: (appointmentData) => api.post('/appointments', appointmentData),
  getAll: (params) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
  getByDoctor: (doctorId, params) => api.get(`/appointments/doctor/${doctorId}`, { params }),
  getByPatient: (patientId, params) => api.get(`/appointments/patient/${patientId}`, { params }),
  cancel: (id) => api.delete(`/appointments/${id}`),
}

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
}

export const feedbackAPI = {
  create: (feedbackData) => api.post('/feedback', feedbackData),
  getAll: (params) => api.get('/feedback', { params }),
  getByDoctor: (doctorId) => api.get(`/feedback/doctor/${doctorId}`),
}

export const contactAPI = {
  send: (contactData) => api.post('/contact', contactData),
}

export default api