import { useState, useEffect } from 'react';
import { Menu, Home, Users, Settings, X, Car, Calendar, CreditCard } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Enhanced navigation items with better organization
  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Car, label: 'Parking Model', path: '/parking-model' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: Users, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed md:static top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo and Close Button */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <Car className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-lg text-gray-900">ParkEase</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                  <span className={`font-medium ${isActive ? 'text-purple-600' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">john@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar - visible on mobile */}
        <nav className="md:hidden flex items-center justify-between px-4 h-16 bg-white shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">ParkEase</span>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;