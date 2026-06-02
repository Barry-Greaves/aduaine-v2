import { motion } from "framer-motion"
import DecodeTitle from "../components/DecodeTitle"
import { artists } from "../data/artists"

function Artists() {
  return (
    <main className="artists-page">
      <header className="page-header">
        <DecodeTitle
          text="ARTISTS"
          className="releases-title decode-title"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Label contributors / full releases
        </motion.p>
      </header>

      <section className="artists-grid">
        {artists.map((artist, index) => (
          <motion.article
            key={artist.id}
            className="artist-card"
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
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
              duration: 0.9,
              ease: [0.77, 0, 0.18, 1],
            }}
          >
            <div className="artist-image">
              <img
                className="artist-img primary"
                src={artist.image}
                alt={artist.name}
              />

              <img
                className="artist-img secondary"
                src={artist.altImage}
                alt={`${artist.name} alternate`}
              />
            </div>

            <div className="artist-info">
              <h2>{artist.name}</h2>
              <p>{artist.releases}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  )
}

export default Artists