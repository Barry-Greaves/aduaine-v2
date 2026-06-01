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
          transition={{ delay: 1, duration: 1 }}
        >
          Visual archive
        </motion.p>
      </header>

    <section className="video-grid">
  {videos.map((video, index) => (
    <motion.div
      key={video.id}
      className="video-card-wrap"
      initial={{
        opacity: 0,
        y: 20,
        scale: 1.5,
        clipPath: "inset(0 100% 0 0)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0 0% 0 0)",
      }}
      transition={{
        delay: 0.8 + index * 0.12,
        duration: 1.9,
        ease: [0.77, 0, 0.18, 1],
      }}
    >
      <button
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
    </motion.div>
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