import { useState } from "react"
import { motion } from "framer-motion"

function Metro() {
  const youtubeId = "DuoncLIN5SY"
  const [entered, setEntered] = useState(false)

  return (
    <main className="metro-page">
      {!entered && (
        <button
          type="button"
          className="metro-enter"
          onClick={() => setEntered(true)}
        >
          <span>ENTER NCART</span>
        </button>
      )}

      {entered && (
        <>
          <motion.div
            className="metro-yellow-wipe"
            initial={{ x: "-100%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 1.3,
              ease: [0.77, 0, 0.18, 1],
            }}
          />

          <motion.div
            className="metro-video-wipe"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{
              duration: 1.3,
              delay: 0.18,
              ease: [0.77, 0, 0.18, 1],
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
              title="Aduaine NCART"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </motion.div>
        </>
      )}
    </main>
  )
}

export default Metro