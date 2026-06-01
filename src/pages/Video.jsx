import { useState } from "react"
import { motion } from "framer-motion"
import { videos } from "../data/videos"
import DecodeTitle from "../components/DecodeTitle"

function Video() {
  const [activeVideo, setActiveVideo] = useState(null)

  const title = "VIDEO"
  const randomOrder = [2, 0, 4, 1, 3]

  return (
    <main className="video-page">
      <header className="page-header">
        <DecodeTitle
  text="VIDEO"
  className="releases-title decode-title"
/>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Visual archive
        </motion.p>
      </header>

      <section className="video-grid">
        {videos.map((video) => (
          <button
            key={video.id}
            className="video-card"
            onClick={() => setActiveVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
            />

            <div className="video-overlay">
              <span>▶</span>
              <h2>{video.title}</h2>
              <p>{video.artist}</p>
            </div>
          </button>
        ))}
      </section>

      {activeVideo && (
        <div
          className="video-modal"
          onClick={() => setActiveVideo(null)}
        >
          <div className="video-modal-inner">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default Video