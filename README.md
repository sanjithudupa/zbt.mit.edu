# Zeta Beta Tau Xi Chapter - MIT Website

A modern, responsive website for the Zeta Beta Tau Xi Chapter at MIT, built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional interface with responsive design
- **React Router**: Seamless navigation between pages
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Responsive**: Mobile-first design that works on all devices
- **Component-Based**: Modular architecture for easy maintenance

## Pages

- **Home**: Overview of the fraternity with key statistics and features
- **Rush**: Information about rush events and schedule
- **Events**: Upcoming and past events with filtering
- **Brothers**: Current brother profiles and leadership
- **House**: House information, amenities, and virtual tour
- **History**: Timeline of chapter history and notable alumni
- **Alumni**: Alumni directory and networking opportunities

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zbwebsite
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Rush.tsx        # Rush page
│   ├── Events.tsx      # Events page
│   ├── Brothers.tsx    # Brothers page
│   ├── House.tsx       # House page
│   ├── History.tsx     # History page
│   └── Alumni.tsx      # Alumni page
├── assets/             # Static assets
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## Design System

### Colors
- Primary: Blue (#2563eb)
- Secondary: Gray scale
- Accent: Various colors for different sections

### Typography
- Font Family: System UI stack
- Responsive text sizing with Tailwind classes

### Components
- Consistent card layouts
- Responsive grid systems
- Interactive hover states
- Modern button styles

## Content

The website includes placeholder content that can be easily replaced with real data:

- Brother profiles and photos
- Event information and images
- House photos and virtual tour
- Alumni directory
- Historical timeline

## Deployment

The project can be deployed to any static hosting service:

1. Build the project:
```bash
yarn build
```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for the Zeta Beta Tau Xi Chapter at MIT.

## Contact

For questions about the website, contact the tech chair at tech@zbt.mit.edu
