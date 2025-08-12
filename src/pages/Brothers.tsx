import { useState, useEffect } from 'react'
import { Users, Award, GraduationCap, MapPin, X, Code, Heart, TrendingUp, Diamond } from 'lucide-react'
import brothersData from '../data/brothersData.json'
import execContacts from '../data/execContacts.json'

interface Brother {
  id: number
  name: string
  zbt_class: string
  graduating_class: number
  bio: string
  role: string
}

interface BrotherWithImage extends Brother {
  imageUrl?: string
  imageExists: boolean
  imageLoading: boolean
  imageError: boolean
}

const Brothers = () => {
  const brothers: Brother[] = brothersData.brothers
  const mostRecentClass = brothersData.most_recent_class

  // Set default selected class to the most recent class
  const [selectedZbtClass, setSelectedZbtClass] = useState(mostRecentClass)
  const [selectedBrother, setSelectedBrother] = useState<BrotherWithImage | null>(null)
  const [brothersWithImages, setBrothersWithImages] = useState<BrotherWithImage[]>([])

  // Function to get image URL for a brother
  const getBrotherImageUrl = (brother: Brother): string => {
    const className = brother.zbt_class.replace(' ', '_')
    return `/images/brothers/${className}/${brother.name}.jpeg`
  }

  // Function to check if image exists
  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  // Function to get image URL with fallback to .jpg
  const getBrotherImageWithFallback = async (brother: Brother): Promise<{ url: string; exists: boolean }> => {
    const jpegUrl = getBrotherImageUrl(brother)
    const jpgUrl = jpegUrl.replace('.jpeg', '.jpg')
    
    // Try .jpeg first
    if (await checkImageExists(jpegUrl)) {
      return { url: jpegUrl, exists: true }
    }
    
    // Try .jpg if .jpeg doesn't exist
    if (await checkImageExists(jpgUrl)) {
      return { url: jpgUrl, exists: true }
    }
    
    // Return .jpeg URL as default (will show placeholder)
    return { url: jpegUrl, exists: false }
  }

  // Load images for all brothers
  useEffect(() => {
    const loadBrotherImages = async () => {
      const brothersWithImagesData = await Promise.all(
        brothers.map(async (brother) => {
          const { url, exists } = await getBrotherImageWithFallback(brother)
          return { 
            ...brother, 
            imageUrl: exists ? url : undefined,
            imageExists: exists,
            imageLoading: false,
            imageError: false
          }
        })
      )
      setBrothersWithImages(brothersWithImagesData)
    }

    loadBrotherImages()
  }, [brothers])

  // Handle image load events
  const handleImageLoad = (brotherId: number) => {
    setBrothersWithImages(prev => 
      prev.map(brother => 
        brother.id === brotherId 
          ? { ...brother, imageLoading: false, imageError: false }
          : brother
      )
    )
  }

  const handleImageError = (brotherId: number) => {
    setBrothersWithImages(prev => 
      prev.map(brother => 
        brother.id === brotherId 
          ? { ...brother, imageLoading: false, imageError: true, imageExists: false }
          : brother
      )
    )
  }

  // Greek alphabet mapping for ordering
  const greekAlphabet = {
    'alpha': 0, 'beta': 1, 'gamma': 2, 'delta': 3, 'epsilon': 4, 'zeta': 5,
    'eta': 6, 'theta': 7, 'iota': 8, 'kappa': 9, 'lambda': 10, 'mu': 11,
    'nu': 12, 'xi': 13, 'omicron': 14, 'pi': 15, 'rho': 16, 'sigma': 17,
    'tau': 18, 'upsilon': 19, 'phi': 20, 'chi': 21, 'psi': 22, 'omega': 23
  }

  // Function to get numeric value of a ZBT class for sorting
  const getZbtClassValue = (zbtClass: string): number => {
    const parts = zbtClass.toLowerCase().split(' ')
    if (parts.length === 2) {
      const prefix = greekAlphabet[parts[0] as keyof typeof greekAlphabet] || 0
      const suffix = greekAlphabet[parts[1] as keyof typeof greekAlphabet] || 0
      return prefix * 24 + suffix // Base 24 system
    }
    return 0
  }

  // Get all unique ZBT classes and sort them in descending order
  const allZbtClasses = Array.from(new Set(brothers.map(b => b.zbt_class)))
    .sort((a, b) => getZbtClassValue(b) - getZbtClassValue(a))

  // Find the index of the most recent class
  const mostRecentIndex = allZbtClasses.indexOf(mostRecentClass)
  
  // Get only the most recent class plus the next 3 classes, then reverse the order
  const displayZbtClasses = allZbtClasses.slice(mostRecentIndex, mostRecentIndex + 4).reverse()
  
  // Filter brothers to only include those from the display classes and sort alphabetically within each class
  const displayBrothers = brothersWithImages
    .filter(brother => displayZbtClasses.includes(brother.zbt_class))
    .sort((a, b) => {
      // First sort by ZBT class (using the display order)
      const aClassIndex = displayZbtClasses.indexOf(a.zbt_class)
      const bClassIndex = displayZbtClasses.indexOf(b.zbt_class)
      if (aClassIndex !== bClassIndex) {
        return aClassIndex - bClassIndex
      }
      // Then sort alphabetically by name within each class
      return a.name.localeCompare(b.name)
    })

  const filteredBrothers = displayBrothers.filter(brother => brother.zbt_class === selectedZbtClass)

  const zbtClasses = displayZbtClasses

  const campusActivities = brothersData.campusActivities.map(activity => ({
    ...activity,
    icon: activity.icon === 'Code' ? <Code size={24} className="text-blue-600" /> : 
         activity.icon === 'Diamond' ? <Diamond size={24} className="text-green-600" /> :
         activity.icon === 'Heart' ? <Heart size={24} className="text-red-600" /> :
         <TrendingUp size={24} className="text-purple-600" />
  }))

  // Helper function to format ZBT class name
  const formatZbtClassName = (zbtClass: string) => {
    return zbtClass.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Helper function to capitalize role
  const capitalizeRole = (role: string) => {
    return role.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{ backgroundImage: 'url(/images/hero/brothers.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-blue-700/80 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Brothers</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the diverse and talented members of Zeta Beta Tau Xi Chapter, 
              representing a wide range of majors and backgrounds from across the globe.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Users size={24} />
                <span className="text-lg font-semibold">40+ Active Brothers</span>
              </div>
              <p className="text-lg">
                From Computer Science to Aerospace Engineering, our brothers represent a wide spectrum 
                of academic excellence at MIT.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Campus Activities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Involvement</h2>
            <p className="text-xl text-gray-600">
              Our brothers are actively involved in various MIT organizations and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {campusActivities.map((activity, index) => (
              <a
                key={index}
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                    {activity.icon}
                  </div>
                  {/* <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" /> */}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {activity.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {activity.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Brothers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Active Brothers</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get to know the brotherhood
            </p>
            
            {/* Filter */}
            <div className="flex justify-center space-x-4 mb-8">
              {zbtClasses.map((zbtClass) => (
                <button
                  key={zbtClass}
                  onClick={() => setSelectedZbtClass(zbtClass)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedZbtClass === zbtClass
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {formatZbtClassName(zbtClass)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredBrothers.map((brother) => (
              <div 
                key={brother.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer w-full max-w-sm"
                onClick={() => setSelectedBrother(brother)}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative">
                  {brother.imageExists && !brother.imageError ? (
                    <>
                      {brother.imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                      <img 
                        src={brother.imageUrl} 
                        alt={brother.name}
                        className={`w-full h-full object-cover object-top ${brother.imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        style={{ objectPosition: 'center 20%' }}
                        onLoad={() => handleImageLoad(brother.id)}
                        onError={() => handleImageError(brother.id)}
                      />
                    </>
                  ) : (
                    <div className="text-gray-500 text-center">
                      <div className="text-3xl mb-2">👤</div>
                      <div className="text-sm font-medium">{brother.name}</div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{formatZbtClassName(brother.zbt_class)}</span>
                    {brother.role && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {capitalizeRole(brother.role)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{brother.name}</h3>
                  <p className="text-gray-600 text-sm">Class of {brother.graduating_class}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brotherhood Photos Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Brotherhood Moments</h2>
            <p className="text-xl text-gray-600">
              Capturing the bonds and memories that make ZBT special
            </p>
          </div>

          <GallerySet
            images={galleryData.brothers.brotherhoodMoments.images}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section> */}

      {/* Brother Modal */}
      {selectedBrother && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedBrother.name}</h2>
                <button
                  onClick={() => setSelectedBrother(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Full height image */}
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedBrother.imageExists && !selectedBrother.imageError ? (
                    <img 
                      src={selectedBrother.imageUrl} 
                      alt={selectedBrother.name}
                      className="w-full h-full object-cover object-top"
                      style={{ objectPosition: 'center 20%' }}
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <div className="text-6xl mb-4">👤</div>
                      <div className="text-lg font-medium">{selectedBrother.name}</div>
                    </div>
                  )}
                </div>
                
                {/* Right side - Info and About Me */}
                <div className="flex flex-col h-96">
                  {/* Basic info at the top */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <GraduationCap size={20} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">Class of {selectedBrother.graduating_class}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">{formatZbtClassName(selectedBrother.zbt_class)}</span>
                    </div>
                    {selectedBrother.role && (
                      <div className="flex items-center space-x-3">
                        <Award size={20} className="text-gray-400" />
                        <span className="text-gray-700 font-medium">{capitalizeRole(selectedBrother.role)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* About Me at the bottom */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">About Me</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedBrother.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join The Brotherhood</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Become part of our diverse and accomplished brotherhood. 
            Rush ZBT and discover lifelong friendships and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rush"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Rush ZBT
            </a>
            <a
              href={`mailto:${execContacts.president.email}`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center"
            >
              Contact President
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Brothers 