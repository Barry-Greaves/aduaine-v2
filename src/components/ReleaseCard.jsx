import { Link } from "react-router-dom"

function ReleaseCard({ release }) {
  return (
    <Link to={`/releases/${release.slug}`} className="release-card">
      <div className="release-artwork">
        <img
          className="release-image primary"
          src={release.cover}
          alt={release.title}
          loading="lazy"
        />

        {release.hoverCover && (
          <img
            className="release-image secondary"
            src={release.hoverCover}
            alt={`${release.title} alternate artwork`}
            loading="lazy"
          />
        )}
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
