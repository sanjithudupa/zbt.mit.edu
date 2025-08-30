import { Mail, MapPin, Instagram } from 'lucide-react'  
import logo from '../assets/images/zbt_crest.png'

const Footer = () => {
  return (
    <footer className="bg-zbt-grey-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sans text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-zbt-blue-400" />
                <span>58 Manchester Road, Brookline, MA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-zbt-blue-400" />
                <span>zbt-president@mit.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram size={20} className="text-zbt-blue-400" />
                <a href="https://www.instagram.com/mit_zbt/" className="text-zbt-grey-300 hover:text-white transition-colors">@mit_zbt</a>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sans text-white">About ZBT</h3>
            <p className="text-zbt-grey-300 mb-4">
              Zeta Beta Tau Xi Chapter has been a cornerstone of MIT's Greek life for over 100 years, 
              fostering brotherhood, academic excellence, and community service.
            </p>
            <div className="flex space-x-4">
              <div className="w-24 bg-transparent flex items-center justify-center">
                <a href="https://zbt.org/"><img src={logo} alt="ZBT Logo" className="w-16 h-16" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zbt-grey-800 mt-8 pt-8 text-center">
          <p className="text-zbt-grey-400">
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