import "./styles/fonts.css"
import "./styles/global.css"
import "./styles/navbar.css"
import "./styles/home.css"
import "./styles/kinetic.css"
import "./styles/releases.css"
import "./styles/video.css"
import "./styles/metro.css"
import "./styles/footer.css"
import "./styles/contact.css"
import "./styles/responsive.css"
import GlitchField from "./components/GlitchField"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Releases from "./pages/Releases"
import Video from "./pages/Video" 
import Contact from "./pages/Contact" 
import ReleaseDetail from "./pages/ReleaseDetail"
import Metro from "./pages/Metro"
import Footer from "./components/footer"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter basename="/aduaine-v2">
      <GlitchField />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/releases/:slug" element={<ReleaseDetail />} />
        <Route path="/video" element={<Video />} />
        <Route path="/metro" element={<Metro />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App