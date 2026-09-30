import { Link } from "react-router-dom"

import { releases } from "../data/releases"
import { videos } from "../data/videos"
import ReleaseCard from "../components/ReleaseCard"
import TiledTitle from "../components/TiledTitle"

function Home() {
  const latestReleases = releases.slice(0, 3)
  const latestVideos = videos.slice(0, 3)

  return (
    <main className="page home-page">
      <section className="home-hero">
        <TiledTitle text="Aduaine" rows={4} font="veloce" />
      </section>

      <section className="home-section">
        <header className="section-head">
          <h2>Latest Releases</h2>
          <Link to="/releases">All releases →</Link>
        </header>

        <div className="release-grid">
          {latestReleases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <header className="section-head">
          <h2>Latest Videos</h2>
          <Link to="/video">All videos →</Link>
        </header>

        <div className="video-grid">
          {latestVideos.map((video) => (
            <Link key={video.id} to="/video" className="video-card">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
              />
              <span className="video-meta">
                <strong>{video.title}</strong>
                <em>{video.artist}</em>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
