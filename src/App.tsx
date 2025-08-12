import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Rush from './pages/Rush'
import Events from './pages/Events'
import Brothers from './pages/Brothers'
import House from './pages/House'
import History from './pages/History'
import Alumni from './pages/Alumni'

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rush" element={<Rush />} />
            <Route path="/events" element={<Events />} />
            <Route path="/brothers" element={<Brothers />} />
            <Route path="/house" element={<House />} />
            <Route path="/history" element={<History />} />
            <Route path="/alumni" element={<Alumni />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
