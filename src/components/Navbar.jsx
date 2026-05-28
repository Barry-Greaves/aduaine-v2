import { useState } from "react"
import { Link } from "react-router-dom"
import symbolMark from "../assets/images/ui/symbol-mark.png"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <Link
      to="/"
      className="logo"
      >
      HOME
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