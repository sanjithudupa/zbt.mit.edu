# Image Gallery System

This document explains how the new clickable image gallery system works and how to add real images to the website.

## Overview

The website now has a comprehensive image gallery system that makes all non-brother pictures clickable to expand them. Images are organized into logical galleries that can be navigated through when expanded.

## Components

### 1. ClickableImage Component
- **Purpose**: Makes any single image clickable to expand in a modal
- **Location**: `src/components/ClickableImage.tsx`
- **Usage**: For standalone images that aren't part of a gallery

### 2. GallerySet Component
- **Purpose**: Groups related images into a gallery with navigation
- **Location**: `src/components/GallerySet.tsx`
- **Usage**: For sets of related images that should be browsable together

### 3. ImageGallery Component (Legacy)
- **Purpose**: Original gallery component (still functional)
- **Location**: `src/components/ImageGallery.tsx`
- **Usage**: Can be used for simple image grids

## Data Organization

All gallery data is centralized in `src/data/galleryData.json` and organized by page:

```json
{
  "home": {
    "lifeAtZBT": {
      "title": "Life at ZBT",
      "description": "A glimpse into daily life and brotherhood at ZBT",
      "images": [...]
    }
  },
  "brothers": {
    "brotherhoodMoments": {
      "title": "Brotherhood Moments",
      "description": "Capturing the bonds and memories that make ZBT special",
      "images": [...]
    }
  }
  // ... more pages
}
```

## Adding Real Images

### Step 1: Prepare Your Images
1. Organize images into folders by category (e.g., `house-tour/`, `rush-events/`, `alumni-reunions/`)
2. Use consistent naming conventions (e.g., `house-exterior.jpg`, `common-room.jpg`)
3. Optimize images for web (recommended: max 1920px width, JPEG format)

### Step 2: Add Images to the Project
1. Create folders in `src/assets/images/` for each category:
   ```
   src/assets/images/
   ├── house-tour/
   ├── rush-events/
   ├── alumni-reunions/
   ├── brotherhood-moments/
   ├── historical/
   └── events/
   ```

2. Import images in your components:
   ```typescript
   import houseExterior from '../assets/images/house-tour/house-exterior.jpg'
   import commonRoom from '../assets/images/house-tour/common-room.jpg'
   ```

### Step 3: Update Gallery Data
Update `src/data/galleryData.json` with real image paths:

```json
{
  "house": {
    "houseTour": {
      "title": "House Tour",
      "description": "Explore our beautiful house and see what makes it special",
      "images": [
        { 
          "id": 1, 
          "src": "/src/assets/images/house-tour/house-exterior.jpg", 
          "alt": "ZBT House Exterior",
          "placeholder": null,
          "placeholderIcon": null
        },
        { 
          "id": 2, 
          "src": "/src/assets/images/house-tour/common-room.jpg", 
          "alt": "Common Room",
          "placeholder": null,
          "placeholderIcon": null
        }
      ]
    }
  }
}
```

### Step 4: Update Components
Replace placeholder images with real ones:

```typescript
// Before (placeholder)
<ClickableImage
  src=""
  alt="ZBT House Exterior"
  placeholder="House Exterior Photo"
  placeholderIcon="🏠"
  className="h-96"
/>

// After (real image)
<ClickableImage
  src={houseExterior}
  alt="ZBT House Exterior"
  className="h-96"
/>
```

## Features

### Modal Expansion
- Click any image to expand it in a full-screen modal
- Press ESC or click outside to close
- Keyboard navigation support (arrow keys for galleries)

### Gallery Navigation
- Navigate between images in a gallery using arrow keys or buttons
- Image counter shows current position (e.g., "2 of 6")
- Smooth transitions between images

### Responsive Design
- Images scale appropriately on all screen sizes
- Grid layouts adapt to different viewport widths
- Touch-friendly on mobile devices

### Accessibility
- Keyboard navigation support
- Screen reader friendly alt text
- Focus management for modal dialogs

## Gallery Categories

### Home Page
- **Life at ZBT**: General brotherhood and daily life photos

### Brothers Page
- **Brotherhood Moments**: Photos of brothers together, events, activities

### Events Page
- **Event Highlights**: Photos from formals, soirees, community service, etc.

### House Page
- **House Tour**: Photos of different rooms and areas of the house
- **Single Images**: House exterior, location map

### History Page
- **Historical Gallery**: Historical photos from the chapter's past
- **Single Images**: Early years photo, modern era photo

### Rush Page
- **Rush Activities**: Photos from previous rush events
- **Single Images**: Previous rush events, meet the brothers

### Alumni Page
- **Alumni Gallery**: Photos from alumni events and reunions
- **Single Images**: Alumni reunions, career success

## Best Practices

1. **Image Optimization**: Compress images to reduce file size while maintaining quality
2. **Consistent Sizing**: Use similar aspect ratios for images in the same gallery
3. **Descriptive Alt Text**: Provide meaningful alt text for accessibility
4. **Organized Folders**: Keep images organized in logical folder structures
5. **Regular Updates**: Update galleries regularly with new photos

## Future Enhancements

- Image lazy loading for better performance
- Lightbox effects and transitions
- Image captions and descriptions
- Social sharing capabilities
- Advanced filtering and search
- Slideshow mode for galleries 