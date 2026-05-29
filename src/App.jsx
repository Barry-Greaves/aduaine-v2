import "./App.css"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Releases from "./pages/Releases"
import Artists from "./pages/Artists"
import Video from "./pages/Video" 
import Mixtapes from "./pages/Mixtapes" 
import Contact from "./pages/Contact" 
import ReleaseDetail from "./pages/ReleaseDetail"
import Metro from "./pages/Metro"
import Footer from "./components/Footer"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter basename="/aduaine-v2">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/releases/:slug" element={<ReleaseDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/video" element={<Video />} />
        <Route path="/Mixtapes" element={<Mixtapes />} />
        <Route path="/metro" element={<Metro />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App