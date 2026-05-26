import "./App.css"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Releases from "./pages/Releases"
import Artists from "./pages/Artists"
import Video from "./pages/Video" 
import Mixtapes from "./pages/Mixtapes" 
import Contact from "./pages/Contact" 
import ReleaseDetail from "./pages/ReleaseDetail"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/releases/:slug" element={<ReleaseDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/video" element={<Video />} />
        <Route path="/Mixtapes" element={<Mixtapes />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App