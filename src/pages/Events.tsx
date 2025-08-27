import execContacts from '../data/execContacts.json'
import ClickableImage from '../components/ClickableImage'

const Events = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/events.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 hero-gradient backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">Events</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              If you are a freshman or a sophomore looking to rush ZBT, make sure to look at the rush page for fall events and activities.
            </p>
          </div>
        </div>
      </section>

      {/* Parties Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Parties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everyone needs a break from work, and being MIT students we know well how difficult the work can be.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Users size={24} className="text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Social Events & Parties</span>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                ZBT house is an often host of social events and parties, an opportunity for brothers to hang out with friends, relax and to have a good time.
              </p>
              <p className="text-gray-600">
                ZBT throws a dozen of big parties open to anyone in MIT community and friends over the duration of the school year. It is a great place to get to know the ZBT community, make new friends or show off your latest dance moves.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Formal Events Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Formal Events</h2>
            <p className="text-xl text-gray-600">
              Elegant celebrations and special gatherings throughout the year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-500">Semi-Annual</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Semi-Annual Formals</h3>
              <p className="text-gray-600">
                Every semester brothers have an opportunity to bring a date to a semi-annual formal event. Events range from a nice special dinner to a boat cruise on the Charles River.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Music size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-500">Invite-Only</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Soiree</h3>
              <p className="text-gray-600">
                Another formal event is Soiree. It is an invite-only evening at the house with fancy desserts, drinks and a karaoke night to follow.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Dinners Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dinners</h2>
            <p className="text-xl text-gray-600">
              We invite our friends to dinners at the house on weekdays
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Dining Experience</h3>
              <p className="text-lg text-gray-700 mb-6">
                Let us delight you with a great company and a high quality dinner. Research has shown that dinners of ribs and teriyaki salmon improve friendships and strengthen bonds by 50%.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Philanthropy Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get On The Ball</h2>
            <p className="text-xl text-gray-600">
              Our annual philanthropy event supporting Children's Miracle Network
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Gift size={24} className="text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Annual Philanthropy Event</span>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Get On The Ball is a philanthropy event that ZBT brothers organize every year in order to raise donations for Children's Miracle Network.
              </p>
              <p className="text-gray-600 mb-6">
                During MIT's Campus Preview Weekend, our campus is filled with prospective students and their parents. Get on the Ball spreads awareness about the work of the Boston Children's Hospital by asking students and visitors to sign a giant, rainbow-colored ball.
              </p>
              <p className="text-gray-600">
                Our sponsors pledge to donate a certain amount for every signature we collect or a lump sum to support the event. We show our appreciation for our sponsors by displaying their logos on the physical ball that we roll around for people to sign, and on Twitter, Facebook, and posters.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Photo Gallery Section */}
      <section className="py-16 section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-4 font-sans">Highlights</h2>
            <p className="text-xl text-zbt-grey-600">
              We host a variety of events throughout the year, including traditional parties, intimate formals and soirees, and philanthropy events like our annual Brookline Haunted House and Get On The Ball.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const eventImages = [
                { src: "/images/events/1.jpeg", alt: "Event Highlight 1" },
                { src: "/images/events/2.jpeg", alt: "Event Highlight 2" },
                { src: "/images/events/3.jpeg", alt: "Event Highlight 3" },
                { src: "/images/events/4.jpeg", alt: "Event Highlight 4" },
                { src: "/images/events/5.jpeg", alt: "Event Highlight 5" },
                { src: "/images/events/6.jpeg", alt: "Event Highlight 6" }
              ];
              
              // Randomize the order
              const shuffledImages = [...eventImages].sort(() => Math.random() - 0.5);
              
              return shuffledImages.map((image, index) => (
                <ClickableImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="h-64"
                />
              ));
            })()}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white">Come Be Part of Our Next Event!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a current student wanting to experience the ZBT community, or another organization looking to hold a joint event,
            we welcome you to ZBT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${execContacts.socialChair}`}
              className="bg-white text-zbt-grey-900 px-8 py-3 rounded-xl font-semibold hover:bg-zbt-grey-50 transition-colors inline-flex items-center justify-center shadow-elegant"
            >
              Contact Social Chair
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events 