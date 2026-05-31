import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { merch } from "../data/merch"

function Merch() {
  return (
    <main className="merch-page">
      <header className="page-header">
        <motion.h1
          className="releases-title"
          initial="hidden"
          animate="visible"
        >
          {"MERCH".split("").map((letter, index) => (
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
                    delay: index * 0.08,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <p>Garments / Objects</p>
      </header>

      <section className="merch-grid">
        {merch.map((item) => (
          <Link
            key={item.id}
            to={`/merch/${item.slug}`}
            className="merch-card"
          >
            <div className="merch-card-image">
              <img
                className="merch-card-img primary"
                src={item.image}
                alt={item.title}
              />

              <img
                className="merch-card-img secondary"
                src={item.altImage}
                alt={`${item.title} alternate`}
              />

              <span className="view-more-bubble fixed">
                View More
              </span>
            </div>

            <div className="merch-card-info">
              <h2>{item.title}</h2>
              <span>{item.type}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default Merch