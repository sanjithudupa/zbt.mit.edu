import { Award, Users, Star, BookOpen, Trophy, Home, GraduationCap } from 'lucide-react'

const History = () => {
  const timeline = [
    {
      year: '1911',
      title: 'Chapter Founded',
      description: 'The Xi Chapter at MIT was founded with help from Zebes from New York and Boston University. We were the 15th chapter of Zeta Beta Tau formed.',
      icon: <Star size={24} className="text-zbt-blue-600" />
    },
    {
      year: '1916',
      title: 'MIT Moves to Cambridge',
      description: 'When MIT moved from Boston to its current location, there was tumult in our chapter, and it eventually found its way down to one man. World War I also weakened the chapter.',
      icon: <Home size={24} className="text-zbt-gold-600" />
    },
    {
      year: '1926',
      title: 'Chapter Dissolves',
      description: 'Xi attempted to rebuild itself after the war, but it eventually failed. By 1926, the chapter had dissolved.',
      icon: <Users size={24} className="text-zbt-grey-600" />
    },
    {
      year: '1956',
      title: 'The Dover Club',
      description: 'Jack Segall from McGill University and Lyle Brown from Syracuse transferred to MIT and tried to restart the dead Xi chapter. They formed the Dover Club with IFC approval.',
      icon: <Award size={24} className="text-zbt-gold-600" />
    },
    {
      year: '1957',
      title: 'First Rush Class',
      description: 'The Dover Club rushed its first class, the Class of 1961 (the Alpha Class). They moved to 2018 Commonwealth Avenue near Boston College.',
      icon: <Users size={24} className="text-zbt-blue-600" />
    },
    {
      year: '1960',
      title: 'Academic Excellence',
      description: 'The Dover Club achieved the number one GPA of all living groups at MIT and was well-known for athletics, winning intramural volleyball tournaments.',
      icon: <BookOpen size={24} className="text-zbt-gold-600" />
    },
    {
      year: '1961',
      title: 'Xi Chapter Reinstated',
      description: 'On February 25, 1961, ZBT accepted the Dover Club as the re-instatement of the Xi Chapter at MIT.',
      icon: <Trophy size={24} className="text-zbt-gold-600" />
    },
    {
      year: '1963',
      title: 'Move to Brookline',
      description: 'Xi acquired the $250,000 house at 58 Manchester Road in Brookline, the same house we live in today.',
      icon: <Home size={24} className="text-zbt-blue-600" />
    },
    {
      year: '1989',
      title: 'Abolition of Pledging',
      description: 'When ZBT abolished pledging, we successfully implemented a freshman program without pledging practices. By 1997, all pledging practices were completely removed.',
      icon: <GraduationCap size={24} className="text-zbt-gold-600" />
    },
    {
      year: 'Today',
      title: 'Continued Excellence',
      description: 'The Xi Chapter continues to excel in academics, athletics, social life, and most importantly Brotherhood.',
      icon: <Star size={24} className="text-zbt-blue-600" />
    }
  ]





  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/history.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">Our History</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              From our founding in 1911 to today, the Xi Chapter has been a cornerstone of MIT's Greek life, 
              fostering brotherhood, academic excellence, and community service.
            </p>
          </div>
        </div>
      </section>



      {/* Historical Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-4 font-sans">Historical Resources</h2>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-zbt-grey-700 mb-8">
              Explore our historical archives, including brotherhood composites dating back to the 1960s 
              and an interactive map of big-little lines since the Alpha Gamma class.
            </p>
            <a
              href="/alumni#alumni-tools"
              className="inline-block bg-zbt-blue-600 text-white px-8 py-3 font-semibold hover:bg-zbt-blue-700 transition-colors"
            >
              View Historical Resources
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zbt-grey-900 mb-4 font-sans">A Century of Brotherhood</h2>
            <p className="text-xl text-zbt-grey-600">
              Key milestones in our chapter's rich and storied history
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-zbt-blue-200"></div>
            
            <div className="space-y-8 md:space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-zbt-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content - full width on mobile, alternating sides on md+ */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="card relative z-20">
                      <div className="flex items-center space-x-3 mb-3">
                        {event.icon}
                        <span className="text-2xl font-bold text-zbt-blue-600">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-zbt-grey-900 mb-2 font-sans">{event.title}</h3>
                      <p className="text-zbt-grey-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-black">Become Part of Our History</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-zbt-grey-700">
            Join the next generation of ZBT brothers and help us continue our century-long 
            tradition of excellence, brotherhood, and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rush"
              className="bg-zbt-blue-600 text-white px-8 py-3 font-semibold hover:bg-zbt-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Rush ZBT
            </a>
            <a
              href="/alumni#tools"
              className="border-2 border-zbt-blue-600 text-zbt-blue-600 px-8 py-3 font-semibold hover:bg-zbt-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Connect with Alumni
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default History 