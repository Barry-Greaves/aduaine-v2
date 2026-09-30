import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [takeover, setTakeover] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTakeover(true)
      setTimeout(() => setTakeover(false), 900)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  function pulse() {
    window.dispatchEvent(
      new CustomEvent("aduaine-glitch", { detail: { power: 0.5 } })
    )
  }

  return (
    <nav className={`navbar ${menuOpen ? "menu-is-open" : ""}`}>
      <Link
        to="/"
        className={`logo ${takeover ? "takeover" : ""}`}
        onClick={closeMenu}
      >
        {takeover ? "ADUAINE" : "HOME"}
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {[
          ["/releases", "Releases"],
          ["/video", "Video"],
          ["/contact", "Contact"],
        ].map(([to, label]) => (
          <NavLink key={to} to={to} onClick={closeMenu} onMouseEnter={pulse}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
