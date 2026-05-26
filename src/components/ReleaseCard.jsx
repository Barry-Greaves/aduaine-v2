import { Link } from "react-router-dom"

function ReleaseCard({ release }) {
  return (
    <Link
      to={`/releases/${release.slug}`}
      className="release-card"
    >
      <div className="release-artwork">
        <img
          src={release.cover}
          alt={release.title}
        />
      </div>

      <div className="release-info">
        <p>{release.catalog}</p>
        <h2>{release.title}</h2>
        <span>{release.artist}</span>
      </div>
    </Link>
  )
}

export default ReleaseCard