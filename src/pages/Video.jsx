import { useState } from "react"
import { motion } from "framer-motion"
import { videos } from "../data/videos"

function Video() {
  const [activeVideo, setActiveVideo] = useState(null)

  const title = "VIDEO"
  const randomOrder = [2, 0, 4, 1, 3]

  return (
    <main className="video-page">
      <header className="page-header">
        <motion.h1
          className="releases-title"
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0,
                  y: 100,
                  rotateZ: -180,
                  filter: "blur(20px)",
                },
                visible: {
                  opacity: 1,
                  scale: [0, 1.4, 1],
                  y: [100, -20, 0],
                  rotateZ: [-90, 10, 0],
                  filter: ["blur(20px)", "blur(2px)", "blur(0px)"],
                  transition: {
                    delay: randomOrder[index] * 0.08,
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

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