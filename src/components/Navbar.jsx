import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [takeover, setTakeover] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTakeover(true)

      setTimeout(() => {
        setTakeover(false)
      }, 900)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={`logo glitch-logo ${takeover ? "takeover" : ""}`}
        onClick={closeMenu}
      >
        {takeover ? "ADUAINE" : "HOME"}
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/releases" onClick={closeMenu}>Releases</Link>
        <Link to="/video" onClick={closeMenu}>Video</Link>
        <Link to="/artists" onClick={closeMenu}>Artists</Link>
        <Link to="/mixtapes" onClick={closeMenu}>Mix Tapes</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar