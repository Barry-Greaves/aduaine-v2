import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Footer() {
  const [metroActive, setMetroActive] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setMetroActive(true)

      setTimeout(() => {
        setMetroActive(false)
      }, 900)
    }, 18000)

    return () => clearInterval(interval)
  }, [])

  function handleFooterClick() {
    if (metroActive) {
      navigate("/metro")
    }
  }

  return (
    <footer className="site-footer">
      <button
        type="button"
        className={`footer-brand ${
          metroActive ? "metro-active" : ""
        }`}
        onClick={handleFooterClick}
      >
        {metroActive ? "METRO" : "ADUAINE"}
      </button>

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

        <a
          href="https://www.instagram.com/aduainemusic/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  )
}

export default Footer