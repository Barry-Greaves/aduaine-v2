// Big tiled type: the same word repeated in full-width rows that clip at the
// frame edge on purpose. Rows arrive glitched, settle, then periodically slip.
// font: "veloce" | "adina" | "hyper" | "mayhem"

function TiledTitle({ text, rows = 3, font = "adina", className = "", as: Tag = "h1" }) {
  const label = text.toUpperCase()

  return (
    <Tag
      className={`tiled-title tiled-${font} ${className}`}
      aria-label={text}
      role={Tag === "h1" ? undefined : "img"}
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
    </Tag>
  )
}

export default TiledTitle
