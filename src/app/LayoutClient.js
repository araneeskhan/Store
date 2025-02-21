'use client'

import { Provider } from 'react-redux'
import { store } from '@/store/store'
import './globals.css'
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LayoutClient({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 3000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }} 
          />
          <main>
            {children}
          </main>
        </div>
      </ThemeProvider>
    </Provider>
  )
} 