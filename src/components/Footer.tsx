import { Mail, MapPin, Instagram } from 'lucide-react'  
import logo from '../assets/images/zbt_crest.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-400" />
                <span>58 Manchester Road, Brookline, MA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400" />
                <span>zbt-president@mit.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram size={20} className="text-blue-400" />
                <a href="https://www.instagram.com/mit_zbt/" className="text-gray-300 hover:text-white transition-colors">@mit_zbt</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/rush" className="text-gray-300 hover:text-white transition-colors">Rush</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="/brothers" className="text-gray-300 hover:text-white transition-colors">Brothers</a></li>
              <li><a href="/alumni" className="text-gray-300 hover:text-white transition-colors">Alumni</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About ZBT</h3>
            <p className="text-gray-300 mb-4">
              Zeta Beta Tau Xi Chapter has been a cornerstone of MIT's Greek life for over 100 years, 
              fostering brotherhood, academic excellence, and community service.
            </p>
            <div className="flex space-x-4">
              <div className="w-24 bg-transparent rounded-full flex items-center justify-center">
                <a href="https://zbt.org/"><img src={logo} alt="ZBT Logo" className="w-16 h-16" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Zeta Beta Tau Xi Chapter. All rights reserved.
          </p>
          {/* <p className="text-gray-400">
            Photography by Various Brothers • Web Development by Sanjith U
          </p> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer 