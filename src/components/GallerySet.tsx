import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: number
  src: string
  alt: string
  placeholder?: string
  placeholderIcon?: string
}

interface GallerySetProps {
  images: GalleryImage[]
  title?: string
  description?: string
  className?: string
  gridCols?: string
}

const GallerySet = ({ 
  images, 
  title, 
  description, 
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
}: GallerySetProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openImage = (index: number) => {
    setSelectedImage(index)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      prevImage()
    }
  }

  return (
    <div className={className}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h3 className="text-2xl font-bold text-zbt-grey-900 mb-2 font-sans">{title}</h3>}
          {description && <p className="text-zbt-grey-600">{description}</p>}
        </div>
      )}

      <div className={`grid ${gridCols} gap-6`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="bg-zbt-grey-200 rounded-lg overflow-hidden h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => openImage(index)}
          >
            {image.placeholder ? (
              <div className="text-zbt-grey-500 text-center">
                <div className="text-3xl mb-2">{image.placeholderIcon || "📸"}</div>
                <div>{image.placeholder}</div>
              </div>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white hover:text-zbt-grey-300 z-10"
            >
              <X size={32} />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zbt-grey-300 z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-zbt-grey-300 z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {images[selectedImage].placeholder ? (
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">{images[selectedImage].placeholderIcon || "📸"}</div>
                  <div className="text-2xl">{images[selectedImage].placeholder}</div>
                </div>
              ) : (
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedImage + 1} of {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GallerySet 