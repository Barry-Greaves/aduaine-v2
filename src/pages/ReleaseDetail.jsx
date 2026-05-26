import { useParams, Link } from "react-router-dom"
import { releases } from "../data/releases"

function ReleaseDetail() {
  const { slug } = useParams()

  const release = releases.find((item) => item.slug === slug)

  if (!release) {
    return (
      <main className="release-detail">
        <h1>Release not found</h1>

        <Link to="/releases" className="back-link">
          ← Back to releases
        </Link>
      </main>
    )
  }

  return (
    <main className="release-detail">
      <Link to="/releases" className="back-link">
        ← Back to releases
      </Link>

      <section className="release-detail-grid">
        <div className="release-detail-artwork">
          <img src={release.cover} alt={release.title} />
        </div>

        <div className="release-detail-info">
          <p>{release.catalog}</p>

          <h1>{release.title}</h1>

          <h2>{release.artist}</h2>

          <div className="release-meta">
            <span>{release.formats?.join(" / ")}</span>
          </div>

          <button>Listen</button>
        </div>
      </section>

      {release.bandcampEmbed && (
        <section className="bandcamp-section">
          <iframe
            src={release.bandcampEmbed}
            title={`${release.title} Bandcamp player`}
            style={{
              border: 0,
              width: "100%",
              height: "472px",
            }}
            seamless
          />
        </section>
      )}
    </main>
  )
}

export default ReleaseDetail