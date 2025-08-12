import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Heart, Calendar } from 'lucide-react'
import zbtCrest from '../assets/images/zbt_crest.png'
import GallerySet from '../components/GallerySet'
import galleryData from '../data/galleryData.json'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ backgroundImage: 'url(/images/hero/home.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src={zbtCrest} alt="ZBT Crest" className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Zeta Beta Tau
              <span className="block text-2xl md:text-3xl font-light mt-2">Xi Chapter • MIT</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A brotherhood of over 50 members from across the United States and various foreign countries, 
              representing a diverse array of majors at MIT and a broad range of on campus activities.
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              MIT ZBT has been a hub of brotherhood, academic excellence, service, and fun for over 100 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rush"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Rush ZBT
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/brothers"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
              >
                Meet the Brothers
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes ZBT Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A fraternity is much more than a place to live or a social outlet for our brothers during their four years at MIT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                We remain dedicated to our reasons for being here, maintaining consistently high academic standards 
                and achieving excellence in our studies while pursuing our passions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Heart size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Service</h3>
              <p className="text-gray-600">
                Our brothers contribute over 1000 hours of community service annually, making a positive impact 
                on the local community and beyond.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Brotherhood</h3>
              <p className="text-gray-600">
                We foster lifelong friendships and connections that extend far beyond our time at MIT, 
                creating a network of support and opportunity.
              </p>
            </div>
          </div>

          <br />
          <hr /> 
          <br />

          <GallerySet
            images={galleryData.home.lifeAtZBT.images}
            title={"Life at ZBT"}
            description={""}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Come Get to Know Us!</h2>
                      <p className="text-xl mb-8 max-w-3xl mx-auto">
              No matter if you go to MIT, Harvard, Wellesley or BU - we welcome new friends to our house. 
              Come to events hosted at our house during the school year and experience the ZBT brotherhood!
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rush"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Join Rush
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/events"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 