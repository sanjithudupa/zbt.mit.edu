import { Mail, Users, GraduationCap, Heart } from 'lucide-react'
import execContacts from '../data/execContacts.json'
import ClickableImage from '../components/ClickableImage'

const Alumni = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ backgroundImage: 'url(/images/hero/alumni.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Alumni</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Once you move beyond your undergrad experience as a zebe, the bonds of brotherhood remain just as strong as ever.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Users size={24} />
                <span className="text-lg font-semibold">Lifelong Brotherhood</span>
              </div>
              <p className="text-lg">
                While our lives and careers lead us to a variety of locations and situations, MIT ZBT continues to thrive and continue the excellence that we were all a part of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ways to Stay Involved</h2>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              As an alum of MIT ZBT, we encourage you to come back to the house for alumni weekend, tech reunion, or whenever you're in the area. We also encourage you to give back to help ensure the continued success of the house.
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumni Weekend</h2>
              <p className="text-lg text-gray-700 mb-6">
                The undergraduates host an alumni weekend every year, usually during the fall term. This has always been a great opportunity for alumni to connect with one another and current brothers.
              </p>
              <p className="text-gray-600">
                Look out for an email for the next alumni weekend or email zbt-president@mit.edu.
              </p>
            </div>

            <div id="alumni-tools" className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alumni Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Brotherhood Composites</h3>
                  <img src="/images/history/archives.png" alt="Composites Archive Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <p className="text-gray-600 mb-4">
                    An archive of the brotherhood composites dating back to 1960s.
                  </p>
                  <a
                    href="https://zbt.mit.edu/archives/"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Archive →
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Big-Little Lines</h3>
                  <img src="/images/history/geneology.png" alt="Genealogy Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <p className="text-gray-600 mb-4">
                    An interactive map of all big-little lines recorded since the Alpha Gamma class.
                  </p>
                  <a
                    href="https://zbt.mit.edu/gen"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Map →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tech Reunion</h2>
              <p className="text-lg text-gray-700 mb-6">
                ZBT hosts an open house every year during MIT's Tech Reunion. All alumni are welcomed and encouraged to stop by.
              </p>
              <p className="text-gray-600">
                You can email the trustees for more details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-600">
              MIT ZBT is proud to receive recognition for our continued excellence
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-blue-50 p-8 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">D. Reid Weedon Jr. Award</h3>
              <p className="text-gray-700 mb-4">
                MIT ZBT is proud to have received the D. Reid Weedon Jr. Award
              </p>
              <img src="/images/alumni/WeedonAward.jpeg" alt="D. Reid Weedon Jr. Award" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Photos Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alumni Memories</h2>
            <p className="text-xl text-gray-600">
              Celebrating the achievements and memories of our alumni
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni Reunions</h3>
              <p className="text-lg text-gray-600 mb-6">
                ZBT Alumni reunion in San Francisco Bay Area. Summer 2018.
              </p>
              <ClickableImage
                src=""
                alt="Alumni Reunion"
                placeholder="Alumni Reunion"
                placeholderIcon="👥"
                className="h-64"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">House Traditions</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our long standing chef Karen recently retired and to say a big thank you to her, we invited alumni to contribute to her parting gift.
              </p>
              <ClickableImage
                src=""
                alt="House Traditions"
                placeholder="House Traditions"
                placeholderIcon="🏠"
                className="h-64"
              />
            </div>
          </div>

          <GallerySet
            images={galleryData.alumni.alumniGallery.images}
            title={galleryData.alumni.alumniGallery.title}
            description={galleryData.alumni.alumniGallery.description}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Reconnect with Your Brothers</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you graduated last year or decades ago, there's always a place for you 
            in the ZBT brotherhood. Stay connected and continue the legacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Alumni Newsletter</h3>
              <p className="text-sm text-white/80 mb-4">
                Stay updated with chapter news and alumni achievements
              </p>
              <a
                href={`mailto:${execContacts.alumniChair.email}`}
                className="text-white hover:text-gray-200 font-medium"
              >
                Subscribe →
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Support the Chapter</h3>
              <p className="text-sm text-white/80 mb-4">
                Contribute to house improvements and other chapter needs
              </p>
              <a
                href="mailto:donations@zbt.mit.edu"
                className="text-white hover:text-gray-200 font-medium"
              >
                Donate →
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${execContacts.alumniChair.email}`}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Contact Alumni Chair
            </a>
            <a
              href="https://maps.app.goo.gl/wsGH25zVRsR6Fggx5"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
            >
              Visit the House
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Alumni 