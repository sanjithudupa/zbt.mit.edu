import { MapPin, Wifi, Utensils, Car, Users, Star, Computer, Bike } from 'lucide-react'
import ClickableImage from '../components/ClickableImage'

const House = () => {
  const amenities = [
    {
      icon: <Car size={24} className="text-blue-600" />,
      title: '12-Seater Van',
      description: 'Van for transportation to and from campus, retreats, and more'
    },
    {
      icon: <Utensils size={24} className="text-green-600" />,
      title: 'Full Kitchen and Private Chef',
      description: 'Industrial kitchen with house dinners on all weeknights'
    },
    {
      icon: <Car size={24} className="text-purple-600" />,
      title: 'Parking',
      description: 'On-site parking for residents'
    },
    {
      icon: <Users size={24} className="text-red-600" />,
      title: 'Study Rooms',
      description: 'Multiple quiet study and collaboration spaces throughout the house'
    },
    {
      icon: <Computer size={24} className="text-orange-600" />,
      title: 'Library and GPUs',
      description: 'Library with hundreds of textbooks and powerful computers with GPUs for AI, gaming, and more'
    },
    {
      icon: <Star size={24} className="text-yellow-600" />,
      title: 'Common Areas',
      description: 'Spacious lounges and social spaces, including an XBox, Wii, ping pong, pool, a golf simulator, and more'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ backgroundImage: 'url(/images/hero/house.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our House</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              ZBT has existed at MIT for over 100 years, and spent the last 50 of those 
              nestled away at our beautiful home in Brookline.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <MapPin size={24} />
                <span className="text-lg font-semibold">58 Manchester Rd, Brookline, MA</span>
              </div>
              <p className="text-lg">
                Our historic house provides a comfortable and welcoming environment 
                for all brothers to live, study, and socialize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Home Away from Home</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our house in Brookline has been the heart of ZBT Xi Chapter for over 50 years. 
                This historic building provides the perfect environment for academic excellence, 
                brotherhood bonding, and personal growth.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With spacious common areas, modern amenities, and a van for transportation, 
                our house offers everything brothers need to succeed both academically and socially.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+16175550123"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <Phone size={20} className="mr-2" />
                  Call Us
                </a>
                <a
                  href="mailto:house@zbt.mit.edu"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">House Amenities</h2>
            <p className="text-xl text-gray-600">
              Everything you need for comfortable living and academic success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {amenity.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* House Tour */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Take a Virtual Tour</h2>
            <p className="text-xl text-gray-600">
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
       <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Prime Location</h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to ZBT! We are located in Brookline, a tree-lined residential area of Boston. Brothers can walk, bike, drive, or ride our 15-passenger van to MIT's campus. The house is within five minutes of basketball and tennis courts, several public parks, numerous restaurants, and a 24-hour supermarket. Our proximity to Boston University, Fenway Park, and Coolidge Corner guarantees that there is always something fun to do.
              </p>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 mb-6">There are several ways to get to and from the house and campus:</p>
                <div className="flex items-center space-x-3">
                  <Car size={20} className="text-orange-600" />
                  <span className="text-gray-700">ZBT Van (5 times a day and during parties)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-green-600" />
                  <span className="text-gray-700"><a className="text-blue-600" href="https://web.mit.edu/facilities/transportation/shuttles/safe_ride.html">MIT SafeRide</a> Cambridge West & Brookline Route</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Bike size={20} className="text-blue-600" />
                  <span className="text-gray-700">BlueBike stations (several nearby)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wifi size={20} className="text-yellow-600" />
                  <span className="text-gray-700">Personal transportation</span>
                </div>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
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
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Live Here?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Come see our beautiful home in person during rush!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rush"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
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