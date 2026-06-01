import { useEffect, useState } from "react"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function DecodeTitle({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(
    text.split("").map(() => "")
  )

  useEffect(() => {
    let frame = 0
    const finalLetters = text.split("")

    const interval = setInterval(() => {
      frame++

      setDisplayText(
        finalLetters.map((letter, index) => {
          if (letter === " ") return " "

          const settleFrame = 12 + index * 8

          if (frame >= settleFrame) {
            return letter
          }

          return alphabet[Math.floor(Math.random() * alphabet.length)]
        })
      )

      if (frame > 12 + finalLetters.length * 8) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [text])

  return (
    <h1 className={className}>
      {displayText.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </h1>
  )
}

export default DecodeTitle