import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Heart } from 'lucide-react'
import zbtCrest from '../assets/images/zbt_crest.png'
import GallerySet from '../components/GallerySet'
import galleryData from '../data/galleryData.json'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/home.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 hero-gradient backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src={zbtCrest} alt="ZBT Crest" className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
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
                className="bg-white text-zbt-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-zbt-grey-50 transition-colors inline-flex items-center justify-center shadow-elegant"
              >
                Rush ZBT
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/brothers"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-zbt-blue-900 transition-colors inline-flex items-center justify-center shadow-elegant"
              >
                Meet the Brothers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes ZBT Special
            </h2>
            <p className="text-xl text-zbt-grey-600 max-w-4xl mx-auto">
              ZBT is more than a place to live or a social outlet for our brothers during their time at MIT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zbt-grey-200 rounded-xl p-6 shadow-soft hover:shadow-homey transition-shadow duration-300">
              <div className="w-10 h-10 bg-zbt-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Award size={20} className="text-zbt-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-zbt-grey-900 mb-3 font-sans">Academic Excellence</h3>
              <p className="text-zbt-grey-600 text-sm leading-relaxed">
                We remain dedicated to our reasons for being here, maintaining consistently high academic standards 
                and achieving excellence in our studies while pursuing our passions.
              </p>
            </div>

            <div className="bg-white border border-zbt-grey-200 rounded-xl p-6 shadow-soft hover:shadow-homey transition-shadow duration-300">
              <div className="w-10 h-10 bg-zbt-gold-50 rounded-lg flex items-center justify-center mb-4">
                <Heart size={20} className="text-zbt-gold-600" />
              </div>
              <h3 className="text-lg font-semibold text-zbt-grey-900 mb-3 font-sans">Community Service</h3>
              <p className="text-zbt-grey-600 text-sm leading-relaxed">
                Our brothers contribute over 1000 hours of community service annually, making a positive impact 
                on the local community and beyond.
              </p>
            </div>

            <div className="bg-white border border-zbt-grey-200 rounded-xl p-6 shadow-soft hover:shadow-homey transition-shadow duration-300">
              <div className="w-10 h-10 bg-zbt-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Users size={20} className="text-zbt-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-zbt-grey-900 mb-3 font-sans">Brotherhood</h3>
              <p className="text-zbt-grey-600 text-sm leading-relaxed">
                We foster lifelong friendships and connections that extend far beyond our time at MIT, 
                creating a network of support and opportunity.
              </p>
            </div>
          </div>

          <br />
          <hr className="border-zbt-grey-300" /> 
          <br />

          <GallerySet
            images={galleryData.home.lifeAtZBT.images}
            title={"Life at ZBT"}
            description={""}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Come Get to Know Us!</h2>
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