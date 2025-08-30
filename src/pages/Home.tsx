import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import GallerySet from '../components/GallerySet'
import galleryData from '../data/galleryData.json'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/home.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src={'/zbt_crest.png'} alt="ZBT Crest" className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
              Zeta Beta Tau
              <span className="block text-2xl md:text-3xl font-light mt-2">Xi Chapter • MIT</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rush"
                className="bg-white text-zbt-blue-900 px-8 py-3 font-semibold hover:bg-zbt-grey-50 transition-colors inline-flex items-center justify-center"
              >
                Rush ZBT
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/brothers"
                className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-zbt-blue-900 transition-colors inline-flex items-center justify-center"
              >
                Meet the Brothers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Life at ZBT Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8" style={{textAlign: 'center'}}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                A brotherhood of over 50 members from across the United States and various foreign countries, representing a diverse array of majors and interests at MIT and a broad range of on campus activities.
              </p>     
          </div>

          <GallerySet
            images={galleryData.home.lifeAtZBT.images}
            title={""}
            description={""}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto mb-12">
            <hr className="border-zbt-grey-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zbt-grey-900">Come Get to Know Us!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-zbt-grey-700">
            No matter if you go to MIT, Harvard, Wellesley or BU - we welcome new friends to our house. 
            Come to events hosted at our house during the school year and experience the ZBT brotherhood!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rush"
              className="bg-zbt-blue-600 text-white px-8 py-3 font-semibold hover:bg-zbt-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Join Rush
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/events"
              className="border-2 border-zbt-blue-600 text-zbt-blue-600 px-8 py-3 font-semibold hover:bg-zbt-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
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