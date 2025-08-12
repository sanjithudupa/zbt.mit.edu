import { useState, useMemo } from 'react'
import { Calendar, MapPin, Users, ArrowRight, Star, X } from 'lucide-react'
import rushData from '../data/rushData.json'
import execContacts from '../data/execContacts.json'
import ClickableImage from '../components/ClickableImage'

const Rush = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique tags from events
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    rushData.events.forEach(event => {
      event.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter events based on selected tags (AND logic)
  const filteredEvents = useMemo(() => {
    return rushData.events.filter(event => {
      const tagMatch = selectedTags.length === 0 || selectedTags.every(tag => event.tags.includes(tag))
      return tagMatch
    })
  }, [selectedTags])

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: { [key: string]: typeof rushData.events } = {}
    filteredEvents.forEach(event => {
      if (!grouped[event.date]) {
        grouped[event.date] = []
      }
      grouped[event.date].push(event)
    })
    return grouped
  }, [filteredEvents])

  const formatDate = (dateStr: string) => {
    const month = parseInt(dateStr.substring(0, 2))
    const day = parseInt(dateStr.substring(3, 5))
    const date = new Date(2025, month - 1, day)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      food: 'bg-orange-100 text-orange-800',
      social: 'bg-blue-100 text-blue-800',
      outdoor: 'bg-green-100 text-green-800',
      sports: 'bg-emerald-100 text-emerald-800',
      games: 'bg-purple-100 text-purple-800',
      house: 'bg-indigo-100 text-indigo-800',
      informational: 'bg-gray-100 text-gray-800',
      fun: 'bg-pink-100 text-pink-800',
      adventure: 'bg-yellow-100 text-yellow-800',
      formal: 'bg-purple-100 text-purple-800',
      invite_only: 'bg-red-100 text-red-800',
      late_night: 'bg-slate-100 text-slate-800'
    }
    return colors[tag] || 'bg-gray-100 text-gray-800'
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSelectedTags([])
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ backgroundImage: 'url(/images/hero/rush.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Rush ZBT!</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Rush is a week-long period at the start of the school year at MIT, when freshmen get to meet us and see all of the other fraternities and living options available to them.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Calendar size={24} />
                <span className="text-lg font-semibold">
                  {new Date(rushData.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date(rushData.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p className="text-lg">
                We have all sorts of activities and mountains of FREE FOOD available for Rush, 
                giving the freshmen the chance to really get to know us and have a fun time doing so.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rush ZBT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Rush ZBT?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes ZBT Xi Chapter the premier fraternity experience at MIT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Star size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                Consistently high academic standards with academic support systems and study groups to help you succeed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Diverse Brotherhood</h3>
              <p className="text-gray-600">
                Brothers from across the United States and various foreign countries, representing all majors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Beautiful House</h3>
              <p className="text-gray-600">
                Our home in Brookline provides a comfortable and welcoming environment for all brothers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rush Schedule */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rush Schedule</h2>
            <p className="text-xl text-gray-600">
              Join us for a week of exciting events and get to know the ZBT brotherhood
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by event type:</span>
              </div>
              
              {selectedTags.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <X size={16} />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {Object.keys(eventsByDay).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No events match the selected filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(eventsByDay).map(([day, events]) => (
                  <div key={day} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-4">
                      <h3 className="text-xl font-semibold">{formatDate(day)}</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {events.map((event, eventIndex) => (
                          <div key={eventIndex} className="border-l-2 border-blue-200 pl-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-blue-600">{event.time}</span>
                                  <h4 className="font-semibold text-gray-900">{event.name}</h4>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                                <div className="flex items-center space-x-1 mb-2">
                                  <MapPin size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">{event.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {event.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                                    >
                                      {tag.replace('_', ' ')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rush Photos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rush Memories</h2>
            <p className="text-xl text-gray-600">
              See what makes rush week so special at ZBT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const rushImages = [
                { src: "/images/rush/1.jpeg", alt: "Rush Memory 1" },
                { src: "/images/rush/2.jpeg", alt: "Rush Memory 2" },
                { src: "/images/rush/3.jpeg", alt: "Rush Memory 3" },
                { src: "/images/rush/4.jpeg", alt: "Rush Memory 4" },
                { src: "/images/rush/5.jpeg", alt: "Rush Memory 5" },
                { src: "/images/rush/6.jpeg", alt: "Rush Memory 6" },
                { src: "/images/rush/7.jpeg", alt: "Rush Memory 7" },
                { src: "/images/rush/8.jpeg", alt: "Rush Memory 8" },
                { src: "/images/rush/9.jpeg", alt: "Rush Memory 9" }
              ];
              
              // Randomize the order
              const shuffledImages = [...rushImages].sort(() => Math.random() - 0.5);
              
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
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Brotherhood?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't miss out on the opportunity to become part of the ZBT family. 
            Contact us to learn more about the rush process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${execContacts.rushChair}`}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Contact Rush Chair
              <ArrowRight size={20} className="ml-2" />
            </a>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Rush 