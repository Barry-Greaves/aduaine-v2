import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-left">
        ADUAINE
      </div>

      <div className="footer-links">
        <a
          href="https://aduaine.bandcamp.com"
          target="_blank"
          rel="noreferrer"
        >
          Bandcamp
        </a>

        <a
          href="https://youtube.com/@Aduaine"
          target="_blank"
          rel="noreferrer"
        >
          YouTube
        </a>
      </div>
    </footer>
  )
}

export default Footer