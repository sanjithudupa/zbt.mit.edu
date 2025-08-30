import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import zbtCrest from '../assets/images/zbt_crest.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/rush', label: 'RUSH' },
    { path: '/events', label: 'EVENTS' },
    { path: '/brothers', label: 'BROTHERS' },
    { path: '/house', label: 'HOUSE' },
    { path: '/history', label: 'HISTORY' },
    { path: '/alumni', label: 'ALUMNI' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-zbt-grey-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={zbtCrest} alt="ZBT Crest" className="w-12 h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-zbt-blue-700 border border-zbt-blue-200'
                    : 'text-zbt-grey-700 hover:text-zbt-blue-700 hover:bg-zbt-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zbt-grey-700 hover:text-zbt-blue-700 focus:outline-none focus:text-zbt-blue-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-zbt-grey-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-zbt-blue-700 border border-zbt-blue-200'
                      : 'text-zbt-grey-700 hover:text-zbt-blue-700 hover:bg-zbt-blue-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 