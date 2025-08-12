import { useState } from 'react'
import { X } from 'lucide-react'

interface ClickableImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  placeholderIcon?: string
}

const ClickableImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder,
  placeholderIcon = "📸"
}: ClickableImageProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const openImage = () => {
    setIsExpanded(true)
  }

  const closeImage = () => {
    setIsExpanded(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeImage()
    }
  }

  return (
    <>
      <div
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        onClick={openImage}
      >
        {placeholder ? (
          <div className="bg-gray-200 rounded-lg overflow-hidden h-full flex items-center justify-center">
            <div className="text-gray-500 text-center p-4">
              <div className="text-3xl mb-2">{placeholderIcon}</div>
              <div>{placeholder}</div>
            </div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      {/* Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>

            <div
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {placeholder ? (
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">{placeholderIcon}</div>
                  <div className="text-2xl">{placeholder}</div>
                </div>
              ) : (
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ClickableImage 