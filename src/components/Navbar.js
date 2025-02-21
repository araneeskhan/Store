'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/store/features/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { ShoppingCartIcon, UserCircleIcon, BellIcon, SunIcon, MoonIcon, ClockIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { user, isAdmin } = useSelector(state => state.auth)
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-blue-500/20 dark:border-purple-500/20'
          : 'bg-transparent'
      }`}>
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          {scrolled && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-purple-500/5"></div>
              <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and main nav */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center space-x-2 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:opacity-80 transition-opacity">
                     Store
                  </span>
                  {/* Logo glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                </motion.div>
              </Link>

              {user && (
                <div className="hidden md:flex items-center space-x-8 ml-10">
                  <NavLink href="/dashboard">
                    <div className="relative group">
                      <svg className="w-5 h-5 transform transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" className="fill-blue-500/20 stroke-blue-500/80 transition-colors group-hover:fill-blue-500/30 group-hover:stroke-blue-600" strokeWidth="1.5"/>
                        <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5Z" className="fill-purple-500/20 stroke-purple-500/80 transition-colors group-hover:fill-purple-500/30 group-hover:stroke-purple-600" strokeWidth="1.5"/>
                        <path d="M4 14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z" className="fill-pink-500/20 stroke-pink-500/80 transition-colors group-hover:fill-pink-500/30 group-hover:stroke-pink-600" strokeWidth="1.5"/>
                        <path d="M14 11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8Z" className="fill-blue-500/20 stroke-blue-500/80 transition-colors group-hover:fill-blue-500/30 group-hover:stroke-blue-600" strokeWidth="1.5"/>
                      </svg>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                    </div>
                    Dashboard
                  </NavLink>
                  <NavLink href="/orders">
                    <div className="relative group">
                      <ClockIcon className="h-5 w-5 text-purple-500 transform transition-transform group-hover:scale-110" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                    </div>
                    Orders
                  </NavLink>
                  {isAdmin && (
                    <NavLink href="/admin" className="relative group">
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-ping"></span>
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                      <div className="relative">
                        <span className="relative z-10">Admin Panel</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                      </div>
                    </NavLink>
                  )}
                </div>
              )}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full p-1.5 border border-gray-200/20 dark:border-gray-700/30 shadow-lg shadow-black/5">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                
                {user && (
                  <>
                    <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"></div>
                    <NotificationBell count={2} />
                    <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"></div>
                    <CartButton itemCount={items.length} />
                    <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300/20 to-transparent"></div>
                    <ProfileDropdown 
                      user={user} 
                      isOpen={isProfileOpen}
                      setIsOpen={setIsProfileOpen}
                      onLogout={() => dispatch(logout())}
                    />
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="md:hidden relative group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg p-1.5 border border-gray-200/20 dark:border-gray-700/30 shadow-lg shadow-black/5">
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/30"
            >
              <div className="px-4 py-3 space-y-1">
                <MobileNavLink href="/dashboard">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" className="fill-blue-500/20 stroke-blue-500/80" strokeWidth="1.5"/>
                    <path d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5Z" className="fill-purple-500/20 stroke-purple-500/80" strokeWidth="1.5"/>
                    <path d="M4 14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z" className="fill-pink-500/20 stroke-pink-500/80" strokeWidth="1.5"/>
                    <path d="M14 11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8Z" className="fill-blue-500/20 stroke-blue-500/80" strokeWidth="1.5"/>
                  </svg>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink href="/orders">
                  <ClockIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Orders
                </MobileNavLink>
                {isAdmin && (
                  <MobileNavLink href="/admin">
                    <div className="relative mr-2">
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-ping"></span>
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    Admin Panel
                  </MobileNavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to prevent content from being hidden under navbar */}
      <div className="h-16"></div>
    </>
  )
}

// Update NavLink component
function NavLink({ href, children, className = "" }) {
  return (
    <Link 
      href={href}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group ${className}`}
    >
      {children}
    </Link>
  )
}

// Update ThemeToggle component
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-amber-500 transform transition-transform group-hover:rotate-180" />
      ) : (
        <MoonIcon className="h-5 w-5 text-blue-600 transform transition-transform group-hover:rotate-180" />
      )}
    </motion.button>
  );
}

// Update NotificationBell component
function NotificationBell({ count }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <BellIcon className="h-5 w-5 text-purple-500 transform transition-transform group-hover:rotate-12" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-xs flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full animate-pulse shadow-lg shadow-rose-500/30">
          {count}
        </span>
      )}
    </motion.button>
  );
}

// Update CartButton component
function CartButton({ itemCount }) {
  return (
    <Link href="/cart">
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <ShoppingCartIcon className="h-5 w-5 text-emerald-500 transform transition-transform group-hover:scale-110" />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-xs flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg shadow-blue-500/30">
            {itemCount}
          </span>
        )}
      </motion.div>
    </Link>
  );
}

// Update ProfileDropdown component
function ProfileDropdown({ user, isOpen, setIsOpen, onLogout }) {
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <UserCircleIcon className="h-5 w-5 text-blue-500 transform transition-transform group-hover:scale-110" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-lg shadow-blue-500/5 py-1 border border-gray-200/20 dark:border-gray-700/30"
          >
            <div className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-b border-gray-200/20 dark:border-gray-700/30">
              {user.name}
            </div>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
            >
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Update MobileNavLink component
function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-colors group"
    >
      {children}
    </Link>
  );
} 