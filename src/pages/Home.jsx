import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { releases } from "../data/releases"
import { videos } from "../data/videos"

import capImage from "../assets/images/merch/sleepunderwriter-cap.jpg"
import hoodieImage from "../assets/images/merch/hexadecimalera-hoodie.jpg"
import tshirtImage from "../assets/images/merch/aduaine-tshirt.jpg"

function Home() {
  const latestReleases = releases.slice(0, 3)
  const latestVideos = videos.slice(0, 3)

  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()

    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <motion.h1
          className="home-logo-word"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
              },
            },
          }}
        >
          {"ADUAINE".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 80,
                  rotateX: 90,
                  filter: "blur(12px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="latest-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p>Latest Releases</p>

          <div className="latest-releases-row">
            {latestReleases.map((release, index) => (
              <Link
                key={release.id}
                to={`/releases/${release.slug}`}
                className="latest-release"
              >
                <div
                  className="latest-image"
                  onMouseMove={handleMouseMove}
                >
                  <img src={release.cover} alt={release.title} />

                  <motion.span
                    className="view-more-bubble"
                    animate={{
                      left: cursor.x,
                      top: cursor.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 22,
                    }}
                  >
                    View More
                  </motion.span>
                </div>

                <motion.div
                  className="latest-release-info"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                >
                  <p>{release.catalog}</p>
                  <h2>{release.title}</h2>
                  <span>{release.artist}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="home-merch-preview">
        <p>Merch</p>

        <div className="merch-preview-grid">
          <Link to="/merch/tshirt" className="merch-item">
            <div className="merch-image" onMouseMove={handleMouseMove}>
              <img src={tshirtImage} alt="Aduaine T-shirt" />

              <motion.span
                className="view-more-bubble"
                animate={{
                  left: cursor.x,
                  top: cursor.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                }}
              >
                View More
              </motion.span>
            </div>

            <span className="merch-title">Aduaine T Shirt</span>
            <span className="merch-type">Embroidered</span>
          </Link>

          <Link to="/merch/cap" className="merch-item">
            <div className="merch-image" onMouseMove={handleMouseMove}>
              <img src={capImage} alt="Sleep Underwriter Cap" />

              <motion.span
                className="view-more-bubble"
                animate={{
                  left: cursor.x,
                  top: cursor.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                }}
              >
                View More
              </motion.span>
            </div>

            <span className="merch-title">Sleep Underwriter Cap</span>
            <span className="merch-type">Embroidered</span>
          </Link>

          <Link to="/merch/hoodie" className="merch-item">
            <div className="merch-image" onMouseMove={handleMouseMove}>
              <img src={hoodieImage} alt="Hexadecimal Era Hoodie" />

              <motion.span
                className="view-more-bubble"
                animate={{
                  left: cursor.x,
                  top: cursor.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                }}
              >
                View More
              </motion.span>
            </div>

            <span className="merch-title">Hexadecimal Era Hoodie</span>
            <span className="merch-type">Embroidered</span>
          </Link>
        </div>
      </section>

      <section className="home-video-preview">
        <p>Latest Videos</p>

        <div className="home-video-grid">
          {latestVideos.map((video) => (
            <Link key={video.id} to="/video" className="home-video-card">
              <div className="home-video-image">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                />

                <span className="home-video-play">▶</span>
              </div>

              <div className="home-video-info">
                <h2>{video.title}</h2>
                <span>{video.artist}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home