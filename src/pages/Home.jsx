import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { releases } from "../data/releases"
import capImage from "../assets/images/merch/sleepunderwriter-cap.jpg"
import hoodieImage from "../assets/images/merch/hexadecimalera-hoodie.jpg"
import tshirtImage from "../assets/images/merch/aduaine-tshirt.jpg"


function Home() {
  const latestReleases = releases.slice(0, 3)

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
    <div className="latest-image">
      <img
        src={release.cover}
        alt={release.title}
      />
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
  <p>MERCH</p>

  <div className="merch-preview-grid">

    <Link to="/merch/tshirt" className="merch-item">
  <div className="merch-image">
    <img src={tshirtImage} alt="Aduaine T-shirt" />
  </div>

  <span className="merch-title">Aduaine T Shirt</span>

  <span className="merch-type">
    Embroidered
  </span>
</Link>

    <Link to="/merch/cap" className="merch-item">
      <div className="merch-image">
        <img src={capImage} alt="Sleep Underwriter Cap" />
      </div>

      <span className="merch-title">Sleep Underwriter Cap</span>

      <span className="merch-type">
        Embroidered
      </span>
    </Link>

    <Link to="/merch/hoodie" className="merch-item">
      <div className="merch-image">
        <img src={hoodieImage} alt="Hexadecimal Era Hoodie" />
      </div>

      <span className="merch-title">Hexadecimal Era Hoodie</span>

      <span className="merch-type">
        Embroidered
      </span>
    </Link>

  </div>
</section>
    </main>
  )
}

export default Home