import { createContext, useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client"
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token'),
          userId: user.id,
          role: user.role
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      })

      newSocket.on('connect', () => {
        console.log('Socket connected')
        setConnected(true)
      })

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected')
        setConnected(false)
      })

      newSocket.on('connect_error', (error) => {
        console.log('Socket connection error:', error)
        setConnected(false)
      })

      newSocket.on('appointmentUpdate', (data) => {
        console.log('Appointment update received:', data)
      })

      newSocket.on('newAppointment', (data) => {
        console.log('New appointment received:', data)
      })

      newSocket.on('appointmentStatusChange', (data) => {
        console.log('Appointment status changed:', data)
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
        setSocket(null)
        setConnected(false)
      }
    } else {
      setConnected(false)
    }
  }, [isAuthenticated, user])

  const emitAppointmentUpdate = (appointmentData) => {
    if (socket && connected) {
      socket.emit('appointmentUpdate', appointmentData)
    }
  }

  const emitAppointmentStatusChange = (appointmentData) => {
    if (socket && connected) {
      socket.emit('appointmentStatusChange', appointmentData)
    }
  }

  const value = {
    socket,
    connected,
    emitAppointmentUpdate,
    emitAppointmentStatusChange,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}