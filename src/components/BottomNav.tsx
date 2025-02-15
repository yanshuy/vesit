import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Car, Calendar, CreditCard } from 'lucide-react'

const BottomNav = () => {
  const location = useLocation()
  
  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Car, label: 'Park', path: '/parking-model' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: CreditCard, label: 'Pay', path: '/payments' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 flex-1 transition-colors duration-200
                ${isActive 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-purple-500 active:text-purple-600'}`}
            >
              <item.icon 
                className={`w-6 h-6 ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                }`} 
              />
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 w-1 h-1 bg-purple-600 rounded-full transform -translate-x-1/2" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Safe Area for iOS devices */}
      <div className="h-safe-area bg-white" />
    </nav>
  )
}

export default BottomNav