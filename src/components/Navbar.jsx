import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">

      <Link
      to="/"
      className="logo"
      >
      HOME
      </Link>

      <div className="nav-links">

        <Link to="/releases"> Releases</Link>

        <Link to="/video">Video</Link>

        <Link to="/artists">Artists</Link>

        <Link to="/mixtapes">Mix Tapes</Link>

        <Link to="/contact">Contact</Link>

      </div>

    </nav>
  )
}

export default Navbar