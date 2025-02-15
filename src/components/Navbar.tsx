import { useState, useEffect } from 'react';
import { Menu, Home, User, Settings, X, Car, Calendar, CreditCard, User2Icon, LogOutIcon, CalendarClock, Map } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Logo from '/src/assets/parkingicon.png'

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

  // Enhanced navigation items with better organization
  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: CalendarClock, label: 'Bookings', path: '/my-bookings' },
    { icon: Map, label: 'Map', path: '/map' },
    { icon: CreditCard, label: 'Payments', path: '/my-payment-options' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("sidebar");
            if (
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                isSidebarOpen
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="flex bg-gray-50">
            {/* Sidebar */}
            <div
                id="sidebar"
                className={`fixed top-0 left-0 z-30 h-screen w-3/4 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden md:w-full ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex h-full flex-col p-4">
                    {/* Logo and Close Button */}
                    <div className="mb-6 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 pl-2">
                          <div className='h-9 w-9 mr-2'>
                            <img src={Logo} alt='Logo' className='h-full object-cover md:-translate-y-1 -translate-y-1'/>
                          </div>
                          <span className="font-semibold text-[1.6rem] max-md:translate-y-1">Parko</span>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              if (item.path === '/') return null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-violet-50 text-violet-600' 
                      : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-violet-600' : 'text-gray-500'}`} />
                  <span className={`font-medium ${isActive ? 'text-violet-600' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

        {/* Top Navbar - half visible on mobile, full visible on website */}
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between md:px-12 px-4 bg-white shadow-sm z-20 pt-5 pb-2 h-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className='h-9 w-9 mr-2'>
              <img src={Logo} alt='Logo' className='h-full object-cover md:-translate-y-1 -translate-y-1'/>
            </div>
            <span className="font-semibold text-[1.6rem] max-md:translate-y-1">Parko</span>
          </div>
          <div className="flex max-md:hidden">
            {navigationItems.map((item) => {
              if(item.label === 'Settings') return null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                    hover:text-violet-500`}
                >
                  <span className={`font-medium`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <button className="cursor-pointer text-indigo-600 hover:text-indigo-700 border border-indigo-500 font-medium px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none">
                Log In
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                className="ml-4 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                <User2Icon className="h-5 w-5 text-gray-700 " />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white border border-gray-200 focus:outline-none"
                  tabIndex={0}
                  onBlur={() => setIsDropdownOpen(false)}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600 w-full text-left"
                      role="menuitem"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2 inline-block align-middle" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="bg-opacity-50 fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Navbar;
