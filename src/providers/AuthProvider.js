'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/features/authSlice'

export default function AuthProvider({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check local storage or cookies for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))
    }
  }, [dispatch])

  return children
} 