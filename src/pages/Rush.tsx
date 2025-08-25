import { useState, useMemo } from 'react'
import { Calendar, MapPin, Users, ArrowRight, Star, X } from 'lucide-react'
import rushData from '../data/rushData.json'
import execContacts from '../data/execContacts.json'
import ClickableImage from '../components/ClickableImage'

const Rush = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Current date and time - change this for testing different scenarios
  const currentDate = new Date()
  // const currentDate = new Date('2025-08-31T14:30:00') // Test: August 31st at 2:30 PM
  
  // Check if content should be blurred (before 8am on rush start date OR any time before that)
  const shouldBlurContent = useMemo(() => {
    // Parse rush start date from "08/30" format
    const [month, day] = rushData.start_date.split('/').map(num => parseInt(num))
    const rushStartDate = new Date(2025, month - 1, day)
    
    // Use current date directly (no timezone conversion)
    const currentDateLocal = new Date(currentDate)
    
    // Check if current date is before rush start date
    const isBeforeRushStart = currentDateLocal < rushStartDate
    
    // Check if it's the same day as rush start and before 8am
    const isRushStartDay = currentDateLocal.getDate() === rushStartDate.getDate() && 
                           currentDateLocal.getMonth() === rushStartDate.getMonth() &&
                           currentDateLocal.getFullYear() === rushStartDate.getFullYear()
    const isBefore8AM = currentDateLocal.getHours() < 8
    const isRushStartDayBefore8AM = isRushStartDay && isBefore8AM
    
    // Blur if before rush start OR if it's rush start day before 8am
    const shouldBlur = isBeforeRushStart || isRushStartDayBefore8AM
    
    // For debugging - log the values
    console.log('Rush start date:', rushStartDate)
    console.log('Current date local:', currentDateLocal)
    console.log('Is before rush start:', isBeforeRushStart)
    console.log('Is rush start day before 8am:', isRushStartDayBefore8AM)
    console.log('Should blur:', shouldBlur)
    
    return shouldBlur
  }, [currentDate])

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



  // Group events by day for display
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

  // Helper function to parse event date and time
  const parseEventDateTime = (dateStr: string, timeStr: string) => {
    const [month, day] = dateStr.split('/').map((num: string) => parseInt(num))
    const [startTime, endTime] = timeStr.split(' - ')
    
    // Parse start time
    const startMatch = startTime.match(/(\d+):(\d+)\s*(AM|PM)/)
    if (!startMatch) return null
    
    let startHour = parseInt(startMatch[1])
    if (startMatch[3] === 'PM' && startHour !== 12) startHour += 12
    if (startMatch[3] === 'AM' && startHour === 12) startHour = 0
    
    // Parse end time
    const endMatch = endTime.match(/(\d+):(\d+)\s*(AM|PM)/)
    if (!endMatch) return null
    
    let endHour = parseInt(endMatch[1])
    if (endMatch[3] === 'PM' && endHour !== 12) endHour += 12
    if (endMatch[3] === 'AM' && endHour === 12) endHour = 0
    
    const startDateTime = new Date(2025, month - 1, day, startHour, parseInt(startMatch[2]))
    const endDateTime = new Date(2025, month - 1, day, endHour, parseInt(endMatch[2]))
    
    return { startDateTime, endDateTime }
  }

  // Helper function to determine event status
  const getEventStatus = (event: any) => {
    const dateTime = parseEventDateTime(event.date, event.time)
    if (!dateTime) return 'past'
    
    const { startDateTime, endDateTime } = dateTime
    
    // Check if event is currently happening
    if (currentDate >= startDateTime && currentDate <= endDateTime) {
      return 'now'
    }
    
    // Check if event has ended (past)
    if (currentDate > endDateTime) {
      return 'past'
    }
    
    // Check if event is upcoming (same day, hasn't started yet)
    const eventDay = new Date(startDateTime.getFullYear(), startDateTime.getMonth(), startDateTime.getDate())
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    
    if (eventDay.getTime() === currentDay.getTime() && currentDate < startDateTime) {
      return 'upcoming'
    }
    
    // Event is on a different day and hasn't started
    return 'later'
  }



  return (
    <div className="min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
          .live-indicator {
            animation: blink 1.5s ease-in-out infinite;
          }
        `
      }} />
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
      <section className="py-16" id="schedule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{new Date(rushData.start_date).getFullYear()} {[7, 8].includes(new Date(rushData.start_date).getMonth()) ? "Fall" : "Spring"} Rush Events</h2>
            <p className="text-xl text-gray-600">
              Join us for a week of exciting events and get to know the ZBT brotherhood
            </p>
            
            {/* IFC Rules Message */}
            {shouldBlurContent && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-lg text-yellow-800 font-medium">
                  As per IFC rules, this schedule will be made available at 8:00 AM on {new Date(rushData.start_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}. Meet us at Kresge Kickoff for more info and enjoy Orientation and REX until then!
                </p>
              </div>
            )}
            

            

          </div>

          {/* Filters */}
          <div className={`mb-8 ${shouldBlurContent ? 'blur-sm pointer-events-none select-none' : ''}`}>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by event type</span>
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

          {/* Phone Call Section - Above the rush events list */}
          <div className={`mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto ${shouldBlurContent ? 'blur-sm pointer-events-none select-none' : ''}`}>
            <p className="text-lg text-gray-700 mb-4 text-center">
              Need a ride to an event? Call us at <span className="font-semibold text-blue-600">888-5444-ZBT</span> and we'll pick you up!
            </p>
            <div className="text-center">
              <a
                href="tel:888-544-4428"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Call 888-544-4428
              </a>
            </div>
          </div>

          <div className={`max-w-4xl mx-auto space-y-8 ${shouldBlurContent ? 'blur-sm pointer-events-none select-none' : ''}`}>
            {/* Current and Upcoming Events by Day */}
            {Object.keys(eventsByDay).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No events match the selected filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(eventsByDay).map(([day, events]) => {
                  // Filter out past events for the main display
                  const activeEvents = events.filter(event => getEventStatus(event) !== 'past')
                  
                  if (activeEvents.length === 0) return null
                  
                  return (
                    <div key={day} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <div className="bg-blue-600 text-white px-6 py-4">
                        <h3 className="text-xl font-semibold">{formatDate(day)}</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {activeEvents.map((event, eventIndex) => {
                            const status = getEventStatus(event)
                            return (
                              <div key={eventIndex} className="border-l-2 border-blue-200 pl-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-sm font-medium text-blue-600">{event.time}</span>
                                      <h4 className="font-semibold text-gray-900">{event.name}</h4>
                                      
                                      {/* Status Badges - only for now and upcoming */}
                                      {status === 'now' && (
                                        <span className="live-indicator bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                          NOW
                                        </span>
                                      )}
                                      {status === 'upcoming' && (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                          UPCOMING
                                        </span>
                                      )}
                                    </div>
                                    
                                    <p className="text-sm mb-2 text-gray-600">{event.description}</p>
                                    
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
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Past Events Section */}
            {(() => {
              const allPastEvents = filteredEvents.filter(event => getEventStatus(event) === 'past')
              
              if (allPastEvents.length === 0) return null
              
              return (
                <div className={shouldBlurContent ? 'blur-sm pointer-events-none select-none' : ''}>
                  <h3 className="text-2xl font-bold text-gray-500 mb-4">Past Events</h3>
                  <div className="space-y-4">
                    {allPastEvents.map((event, eventIndex) => (
                      <div key={`past-${eventIndex}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-60">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-gray-500">{event.time}</span>
                              <h4 className="font-semibold text-gray-500">{event.name}</h4>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-1 rounded">
                                {formatDate(event.date)}
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">{event.description}</p>
                            <div className="flex items-center space-x-1 mb-2">
                              <MapPin size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-500">{event.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {event.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600"
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
              )
            })()}
            

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