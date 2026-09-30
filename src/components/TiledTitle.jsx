// Big tiled type: the same word repeated in full-width rows that clip at the
// frame edge on purpose. Rows arrive glitched, settle, then periodically slip.
// font: "veloce" | "adina" | "hyper" | "mayhem"

function TiledTitle({ text, rows = 3, font = "adina", className = "" }) {
  const label = text.toUpperCase()

  return (
    <h1
      className={`tiled-title tiled-${font} ${className}`}
      aria-label={text}
    >
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={i}
          className="tiled-row"
          aria-hidden="true"
          style={{
            "--i": i,
            "--shift": i % 2 === 0 ? "0" : "-0.5",
          }}
        >
          {Array.from({ length: 8 }, (_, j) => (
            <span key={j}>{label}</span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export default TiledTitle
