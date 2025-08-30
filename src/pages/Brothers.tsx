import { useState, useEffect } from 'react'
import { Award, GraduationCap, MapPin, X } from 'lucide-react'
import brothersData from '../data/brothersData.json'


interface Brother {
  id: string
  name: string
  zbt_class: string
  graduating_class: number
  bio: string
  role: string
  rush_order: number
  big: string
  littles: string[]
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
  const [showLittlesTooltip, setShowLittlesTooltip] = useState(false)

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

  // Handle URL hash for opening brother modal
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      if (hash) {
        const brother = brothersWithImages.find(b => b.id === hash)
        if (brother) {
          setSelectedBrother(brother)
          // Switch to the brother's class tab if it's different from current selection
          setSelectedZbtClass(brother.zbt_class)
        }
      } else {
        setSelectedBrother(null)
      }
    }

    // Check hash on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [brothersWithImages])

  // Function to navigate to brother without scrolling
  const navigateToBrother = (brotherId: string) => {
    // Temporarily disable scroll restoration
    const scrollRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    
    // Set the hash to trigger the hash change handler
    window.location.hash = brotherId
    
    // Re-enable scroll restoration after a short delay
    setTimeout(() => {
      history.scrollRestoration = scrollRestoration
    }, 100)
    
    setSelectedBrother(null)
  }

  // Close littles tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showLittlesTooltip) {
        setShowLittlesTooltip(false)
      }
    }

    if (showLittlesTooltip) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLittlesTooltip])

  // Handle image load events
  const handleImageLoad = (brotherId: string) => {
    setBrothersWithImages(prev => 
      prev.map(brother => 
        brother.id === brotherId 
          ? { ...brother, imageLoading: false, imageError: false }
          : brother
      )
    )
  }

  const handleImageError = (brotherId: string) => {
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
  
  // Filter brothers to only include those from the display classes and sort by rush order within each class
  const displayBrothers = brothersWithImages
    .filter(brother => displayZbtClasses.includes(brother.zbt_class))
    .sort((a, b) => {
      // First sort by ZBT class (using the display order)
      const aClassIndex = displayZbtClasses.indexOf(a.zbt_class)
      const bClassIndex = displayZbtClasses.indexOf(b.zbt_class)
      if (aClassIndex !== bClassIndex) {
        return aClassIndex - bClassIndex
      }
      // Then sort by rush order within each class
      return a.rush_order - b.rush_order
    })

  const filteredBrothers = displayBrothers.filter(brother => brother.zbt_class === selectedZbtClass)

  const zbtClasses = displayZbtClasses

  const campusActivities = brothersData.campusActivities.map(activity => ({
    ...activity,
    icon: <img 
      src={`https://www.google.com/s2/favicons?domain=${activity.link}&sz=32`} 
      alt={`${activity.name} favicon`}
      className="w-6 h-6"
      onError={(e) => {
        // Fallback to original icon if favicon fails
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement!.innerHTML = activity.icon === 'Code' ? '<svg width="20" height="20" fill="currentColor" class="text-zbt-blue-600"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' : 
                                                                    activity.icon === 'Diamond' ? '<svg width="20" height="20" fill="currentColor" class="text-zbt-gold-600"><path d="M6 3h12l4 6-10 12L2 9l4-6z"></path></svg>' :
                                                                    activity.icon === 'Heart' ? '<svg width="20" height="20" fill="currentColor" class="text-zbt-gold-600"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>' :
                                                                    activity.icon === 'Car' ? '<svg width="20" height="20" fill="currentColor" class="text-zbt-gold-600"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path></svg>' :
                                                                    '<svg width="20" height="20" fill="currentColor" class="text-zbt-blue-600"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>';
      }}
    />
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
      <section className="hero-section relative text-white" style={{ backgroundImage: 'url(/images/hero/brothers.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">Brothers</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Meet the diverse and talented members of Zeta Beta Tau Xi Chapter, 
              representing a wide range of majors and backgrounds from across the globe.
            </p>
            
          </div>
        </div>
      </section>


      {/* Campus Activities */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans">Campus Involvement</h2>
            <p className="text-xl text-zbt-grey-600">
              Our brothers are actively involved in various MIT organizations and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto justify-items-center">
            {campusActivities.map((activity, index) => (
              <a
                key={index}
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card text-center group w-full max-w-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-zbt-grey-100 flex items-center justify-center mx-auto">
                    {activity.icon}
                  </div>
                  {/* <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" /> */}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-zbt-blue-600 transition-colors font-sans">
                  {activity.name}
                </h3>
                <p className="text-zbt-grey-600 text-sm">
                  {activity.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Brothers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans">Active Brothers</h2>

            
            {/* Filter */}
            <div className="flex justify-center space-x-4 mb-8">
              {zbtClasses.map((zbtClass) => (
                <button
                  key={zbtClass}
                  onClick={() => setSelectedZbtClass(zbtClass)}
                  className={`px-4 py-2  font-medium transition-colors ${
                    selectedZbtClass === zbtClass
                      ? 'bg-zbt-blue-600 text-white'
                      : 'bg-zbt-grey-200 text-black hover:bg-zbt-grey-300'
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
                className="bg-cream-50 border border-cream-200 overflow-hidden cursor-pointer w-full max-w-sm"
                onClick={() => {
                  setSelectedBrother(brother)
                  window.location.hash = brother.id
                }}
              >
                <div className="h-48 bg-cream-200 flex items-center justify-center overflow-hidden relative">
                  {brother.imageExists && !brother.imageError ? (
                    <>
                      {brother.imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-cream-100">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warm-600"></div>
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
                    <div className="text-zbt-grey-500 text-center">
                      <div className="text-3xl mb-2">👤</div>
                      <div className="text-sm font-medium">{brother.name}</div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zbt-grey-500">{formatZbtClassName(brother.zbt_class)}</span>
                    {brother.role && (
                      <span className="px-2 py-1 bg-zbt-gold-100 text-zbt-gold-800 rounded-full text-xs font-medium">
                        {capitalizeRole(brother.role)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-1 font-sans">{brother.name}</h3>
                  <p className="text-zbt-grey-600 text-sm">Class of {brother.graduating_class}</p>
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
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zbt-grey-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-black font-sans">{selectedBrother.name}</h2>
                <button
                  onClick={() => {
                    // Temporarily disable scroll restoration
                    const scrollRestoration = history.scrollRestoration
                    history.scrollRestoration = 'manual'
                    
                    // Remove hash to trigger the hash change handler
                    window.location.hash = 'x'
                    
                    // Re-enable scroll restoration after a short delay
                    setTimeout(() => {
                      history.scrollRestoration = scrollRestoration
                    }, 100)
                    
                    setSelectedBrother(null)
                  }}
                  className="text-zbt-grey-400 hover:text-zbt-grey-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Full height image */}
                <div className="h-96 bg-zbt-grey-200  flex items-center justify-center overflow-hidden">
                  {selectedBrother.imageExists && !selectedBrother.imageError ? (
                    <img 
                      src={selectedBrother.imageUrl} 
                      alt={selectedBrother.name}
                      className="w-full h-full object-cover object-top"
                      style={{ objectPosition: 'center 20%' }}
                    />
                  ) : (
                    <div className="text-zbt-grey-500 text-center">
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
                      <GraduationCap size={20} className="text-zbt-grey-400" />
                      <span className="text-zbt-grey-700 font-medium">Class of {selectedBrother.graduating_class}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-zbt-grey-400" />
                      <span className="text-zbt-grey-700 font-medium">{formatZbtClassName(selectedBrother.zbt_class)}</span>
                    </div>
                    {selectedBrother.role && (
                      <div className="flex items-center space-x-3">
                        <Award size={20} className="text-zbt-grey-400" />
                        <span className="text-zbt-grey-700 font-medium">{capitalizeRole(selectedBrother.role)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* About Me at the bottom */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-black mb-3 text-lg font-sans">About Me</h3>
                    <p className="text-zbt-grey-600 leading-relaxed">{selectedBrother.bio}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-zbt-grey-200">
                {/* Left side - Big button */}
                <div className="flex-1 flex justify-start">
                  {selectedBrother.big && (() => {
                    const big = brothersWithImages.find(b => b.id === selectedBrother.big)
                    return big ? (
                      <button
                        onClick={() => navigateToBrother(selectedBrother.big)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-zbt-grey-600 hover:text-zbt-grey-800 hover:bg-zbt-grey-100  transition-colors"
                      >
                        <span className="text-zbt-grey-400">←</span>
                        <span>Big ({big.name})</span>
                      </button>
                    ) : null
                  })()}
                </div>
                
                {/* Right side - Little button */}
                <div className="flex-1 flex justify-end">
                  {selectedBrother.littles && selectedBrother.littles.length > 0 && (
                    <div className="relative">
                      {selectedBrother.littles.length === 1 ? (() => {
                        const little = brothersWithImages.find(b => b.id === selectedBrother.littles[0])
                        return little ? (
                          <button
                                                      onClick={() => navigateToBrother(selectedBrother.littles[0])}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-zbt-grey-600 hover:text-zbt-grey-800 hover:bg-zbt-grey-100  transition-colors"
                          >
                            <span>Little ({little.name})</span>
                            <span className="text-zbt-grey-400">→</span>
                          </button>
                        ) : null
                      })() : (
                        <button
                          onClick={() => setShowLittlesTooltip(!showLittlesTooltip)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-zbt-grey-600 hover:text-zbt-grey-800 hover:bg-zbt-grey-100  transition-colors"
                        >
                          <span>Little (multiple)</span>
                          <span className="text-zbt-grey-400">→</span>
                        </button>
                      )}
                      
                      {/* Tooltip for multiple littles */}
                      {showLittlesTooltip && selectedBrother.littles.length > 1 && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white border border-zbt-grey-200  shadow-lg p-2 min-w-32 z-10">
                          {selectedBrother.littles.map((littleId) => {
                            const little = brothersWithImages.find(b => b.id === littleId)
                            return little ? (
                              <button
                                key={littleId}
                                                              onClick={() => {
                                navigateToBrother(littleId)
                                setShowLittlesTooltip(false)
                              }}
                                className="block w-full text-left px-3 py-2 text-sm text-zbt-grey-700 hover:bg-zbt-grey-100 rounded transition-colors"
                              >
                                {little.name}
                              </button>
                            ) : null
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto mb-12">
            <hr className="border-zbt-grey-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-black">Join The Brotherhood</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Become part of our diverse and accomplished brotherhood. 
            Rush ZBT and discover lifelong friendships and opportunities.
          </p>
          <div className="flex justify-center">
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

export default Brothers 