import { motion } from "framer-motion"

import { releases } from "../data/releases"
import ReleaseCard from "../components/ReleaseCard"

function Releases() {
  return (
    <main className="releases-page">
      <header className="page-header">
        <motion.h1
  className="releases-title"
  initial="hidden"
  animate="visible"
>
  {"RELEASES".split("").map((letter, index) => {
    const randomOrder = [4, 1, 7, 0, 5, 2, 6, 3]

    return (
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

            filter: [
              "blur(20px)",
              "blur(2px)",
              "blur(0px)",
            ],

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
    )
  })}
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Catalogue archive
        </motion.p>
      </header>

      <motion.section
        className="release-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.6,
            },
          },
        }}
      >
        {releases.map((release) => (
          <motion.div
            key={release.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
          >
            <ReleaseCard release={release} />
          </motion.div>
        ))}
      </motion.section>
    </main>
  )
}

export default Releases