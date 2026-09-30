import { useEffect, useState } from "react"
import { videos } from "../data/videos"
import TiledTitle from "../components/TiledTitle"

function Video() {
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e) => e.key === "Escape" && setActiveVideo(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeVideo])

  return (
    <main className="page video-page">
      <header className="page-header">
        <TiledTitle text="Video" rows={2} font="adina" />
        <p className="page-sub">Visual archive / {videos.length} entries</p>
      </header>

      <section className="video-grid">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            className="video-card"
            onClick={() => setActiveVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              loading="lazy"
            />
            <span className="video-meta">
              <strong>{video.title}</strong>
              <em>{video.artist}</em>
            </span>
          </button>
        ))}
      </section>

      {activeVideo && (
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <button type="button" className="video-close" onClick={() => setActiveVideo(null)}>
            Close
          </button>
        </div>
      )}
    </main>
  )
}

export default Video
