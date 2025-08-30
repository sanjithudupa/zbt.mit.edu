import { Utensils, Car, Users, Star, Computer } from 'lucide-react'
import ClickableImage from '../components/ClickableImage'

const House = () => {
  const amenities = [
    {
      icon: <Car size={24} className="text-zbt-blue-600" />,
      title: '15-Seater Van',
      description: 'Van for transportation to and from campus, retreats, and more'
    },
    {
      icon: <Utensils size={24} className="text-zbt-gold-600" />,
      title: 'Full Kitchen and Private Chef',
      description: 'Industrial kitchen with house dinners on all weeknights'
    },
    {
      icon: <Car size={24} className="text-zbt-blue-600" />,
      title: 'Parking',
      description: 'On-site parking for residents'
    },
    {
      icon: <Users size={24} className="text-zbt-gold-600" />,
      title: 'Study Rooms',
      description: 'Multiple quiet study and collaboration spaces throughout the house'
    },
    {
      icon: <Computer size={24} className="text-zbt-blue-600" />,
      title: 'Library and GPUs',
      description: 'Library with hundreds of textbooks and powerful computers with GPUs for AI, gaming, and more'
    },
    {
      icon: <Star size={24} className="text-zbt-gold-600" />,
      title: 'Common Areas',
      description: 'Spacious lounges and social spaces, including an XBox, Wii, ping pong, pool, a golf simulator, and more'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/house.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">Our House</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              ZBT has existed at MIT for over 100 years, and spent the last 50 of those 
              nestled away at our beautiful home in Brookline.
            </p>
          </div>
        </div>
      </section>

      {/* House Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-6 font-sans">A Home Away from Home</h2>
              <p className="text-lg text-zbt-grey-600 mb-6">
                Our house in Brookline has been the heart of ZBT Xi Chapter for over 50 years. 
                This historic building provides the perfect environment for academic excellence, 
                brotherhood bonding, and personal growth.
              </p>
              <p className="text-lg text-zbt-grey-600 mb-8">
                With spacious common areas and a van for transportation, 
                our house offers everything brothers need.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+16175550123"
                  className="bg-zbt-blue-600 text-black px-6 py-3  font-semibold hover:bg-zbt-blue-700 transition-colors inline-flex items-center justify-center "
                >
                  <Phone size={20} className="mr-2" />
                  Call Us
                </a>
                <a
                  href="mailto:house@zbt.mit.edu"
                  className="border-2 border-zbt-blue-600 text-zbt-blue-600 px-6 py-3  font-semibold hover:bg-zbt-blue-600 hover:text-black transition-colors inline-flex items-center justify-center "
                >
                  <Mail size={20} className="mr-2" />
                  Email Us
                </a>
              </div> */}
            </div>
            <ClickableImage
              src="/images/house/zbt_house.jpeg"
              alt="ZBT House Exterior"
              className="h-96"
            />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-4 font-sans">House Amenities</h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-zbt-grey-900 mb-3 font-sans">{amenity.title}</h3>
                  <p className="text-zbt-grey-600 leading-relaxed">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* House Tour */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-4 font-sans">Take a Virtual Tour</h2>
            <p className="text-xl text-zbt-grey-600">
              Explore our beautiful house and see what makes it special
            </p>
          </div>

          <GallerySet
            images={galleryData.house.houseTour.images}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section> */}

       {/* Location */}
       <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-6 font-sans">Prime Location</h2>
              <p className="text-lg text-zbt-grey-600 mb-6">
                Welcome to ZBT! We are located in Brookline, a tree-lined residential area of Boston. Brothers can walk, bike, drive, or ride our 15-passenger van to MIT's campus. The house is within five minutes of basketball and tennis courts, several public parks, numerous restaurants, and a 24-hour supermarket. Our proximity to Boston University, Fenway Park, and Coolidge Corner guarantees that there is always something fun to do.
              </p>
              <div className="space-y-4">
                <p className="text-lg text-zbt-grey-600 mb-6">There are several ways to get to and from the house and campus:</p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-zbt-grey-400 mt-1">•</span>
                    <span className="text-zbt-grey-700">ZBT Van (5 times a day and during parties)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-zbt-grey-400 mt-1">•</span>
                    <span className="text-zbt-grey-700"><a className="text-zbt-blue-600" href="https://web.mit.edu/facilities/transportation/shuttles/safe_ride.html">MIT SafeRide</a> Cambridge West & Brookline Route</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-zbt-grey-400 mt-1">•</span>
                    <span className="text-zbt-grey-700">BlueBike stations (several nearby)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-zbt-grey-400 mt-1">•</span>
                    <span className="text-zbt-grey-700">Personal transportation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-96  overflow-hidden ">
              <iframe
                src="https://maps.google.com/maps?q=58+Manchester+Road+Brookline+Massachusetts&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZBT House - 58 Manchester Road, Brookline, MA"
              ></iframe>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto mb-12">
            <hr className="border-zbt-grey-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-black">Want to Live Here?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Come see our beautiful home in person during rush!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rush"
              className="border-2 border-zbt-blue-600 text-zbt-blue-600 px-8 py-3 font-semibold hover:bg-zbt-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Rush ZBT
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default House 