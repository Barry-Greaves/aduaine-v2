import { useCallback, useEffect, useRef, useState } from "react"
import { releases } from "../data/releases"
import TiledTitle from "./TiledTitle"

// Audio-reactive kinetic type. Idle: the tiled ADUAINE wall. Press play and the
// type becomes the interface: catalogue words re-flow between layout modes on
// the track's own structure, hit on the kicks, tear away from the pointer, and
// the drum breakdown (141-157 s) throws the RGB colour break.
//
// Keys: Q stack, W right, E grid, R wall, T colour break, space play/pause, F fullscreen.

const TRACK = `${import.meta.env.BASE_URL}audio/kalpol-oz.mp3`
const BAR = (60 / 147) * 4 // Kalpol OZ is 147 BPM
const CYCLE = ["stack", "right", "grid", "wall"]
const KEY_MODES = { q: "stack", w: "right", e: "grid", r: "wall" }
const BREAKDOWN = [141, 157]
const WALL_ROWS = 4
const REPEATS = 10

function buildPhrases() {
  const phrases = []
  releases.forEach((r, i) => {
    const num = r.catalog.replace(/^ADUAINE\s*/i, "")
    phrases.push(["ADUAINE", num, ...r.title.split(/\s+/), ...r.artist.split(/\s+/)].slice(0, 8))
    if (i % 3 === 2) phrases.push(["ADUAINE"])
  })
  return phrases
}

const PHRASES = buildPhrases()

function KineticHero() {
  const stageRef = useRef(null)
  const audioRef = useRef(null)
  const engine = useRef({})
  const modeRef = useRef("stack")
  const phraseRef = useRef(0)

  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState("stack")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [rgb, setRgb] = useState(false)

  const phrase = PHRASES[phraseIdx % PHRASES.length]

  // cache the word / row elements after every re-render of the stage
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const e = engine.current
    e.words = [...stage.querySelectorAll(".k-word")]
    e.rows = [...stage.querySelectorAll(".k-row")]
    e.offs = e.words.map(() => ({ x: 0, y: 0 }))
    e.rowW = e.rows.map((r) => (r.firstChild ? r.firstChild.getBoundingClientRect().width : 0))
    e.hits = []
    e.rowX = e.rowX || []
  }, [mode, phraseIdx, started])

  const setModeBoth = useCallback((m, holdSeconds = 0) => {
    modeRef.current = m
    setMode(m)
    if (holdSeconds) engine.current.overrideUntil = performance.now() + holdSeconds * 1000
  }, [])

  const setupAudio = useCallback(() => {
    const e = engine.current
    if (e.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.6
    const src = ctx.createMediaElementSource(audioRef.current)
    src.connect(analyser)
    analyser.connect(ctx.destination)
    e.ctx = ctx
    e.analyser = analyser
    e.freq = new Uint8Array(analyser.frequencyBinCount)
    e.prevBass = 0
    e.prevHigh = 0
    e.avgFlux = 0
    e.lastKick = 0
    e.lastSnare = 0
    e.hitIdx = 0
    e.bass = 0
    e.mid = 0
    e.high = 0
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    setupAudio()
    const e = engine.current
    if (e.ctx.state === "suspended") await e.ctx.resume()
    if (audio.paused) {
      if (audio.ended) audio.currentTime = 0
      await audio.play()
      setStarted(true)
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }, [setupAudio])

  // pointer + keyboard
  useEffect(() => {
    const e = engine.current
    e.px = -9999
    e.py = -9999
    const onMove = (ev) => { e.px = ev.clientX; e.py = ev.clientY }
    const onLeave = () => { e.px = -9999; e.py = -9999 }
    const onKey = (ev) => {
      if (ev.target.closest?.("input, textarea, select")) return
      const k = ev.key.toLowerCase()
      if (k === " ") { ev.preventDefault(); togglePlay() }
      else if (k === "f") { stageRef.current?.requestFullscreen?.() }
      else if (k === "t") { e.rgbHold = performance.now() + 4000 }
      else if (KEY_MODES[k]) { setModeBoth(KEY_MODES[k], 20) }
    }
    window.addEventListener("pointermove", onMove)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("keydown", onKey)
    }
  }, [togglePlay, setModeBoth])

  // the frame loop, only while playing
  useEffect(() => {
    if (!playing) return
    const e = engine.current
    const stage = stageRef.current
    const audio = audioRef.current
    let raf = 0
    let last = performance.now()

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const t = audio.currentTime

      // ---- audio analysis
      e.analyser.getByteFrequencyData(e.freq)
      const avg = (a, b) => {
        let s = 0
        for (let i = a; i < b; i++) s += e.freq[i]
        return s / (b - a) / 255
      }
      const bassNow = avg(1, 6)
      const midNow = avg(6, 40)
      const highNow = avg(40, 180)
      e.bass += (bassNow - e.bass) * 0.35
      e.mid += (midNow - e.mid) * 0.25
      e.high += (highNow - e.high) * 0.25
      stage.style.setProperty("--bass", e.bass.toFixed(3))
      stage.style.setProperty("--mid", e.mid.toFixed(3))
      stage.style.setProperty("--high", e.high.toFixed(3))
      stage.style.setProperty("--p", (t / (audio.duration || 248)).toFixed(4))

      // onsets: positive flux against an adaptive threshold
      const bFlux = Math.max(0, bassNow - e.prevBass)
      const hFlux = Math.max(0, highNow - e.prevHigh)
      e.prevBass = bassNow
      e.prevHigh = highNow
      e.avgFlux += (bFlux - e.avgFlux) * 0.05

      const words = e.words || []
      const rows = e.rows || []
      const kick = bFlux > Math.max(0.035, e.avgFlux * 2.2) && t - e.lastKick > 0.18
      const snare = hFlux > 0.03 && t - e.lastSnare > 0.12

      if (kick) {
        e.lastKick = t
        e.hitIdx++
        const el = words.length ? words[e.hitIdx % words.length] : rows[e.hitIdx % rows.length]
        if (el) {
          el.classList.add("hit")
          e.hits.push({ el, until: now + (modeRef.current === "grid" ? 260 : 170) })
        }
        window.dispatchEvent(new CustomEvent("aduaine-glitch", { detail: { power: 0.5 + e.bass } }))
      }
      if (snare && words.length) {
        e.lastSnare = t
        const el = words[Math.floor(Math.random() * words.length)]
        el.classList.add(Math.random() < 0.5 ? "alt" : "slip")
        e.hits.push({ el, until: now + 190, cls: ["alt", "slip"] })
      }
      for (let i = e.hits.length - 1; i >= 0; i--) {
        if (now > e.hits[i].until) {
          e.hits[i].el.classList.remove("hit", "alt", "slip")
          e.hits.splice(i, 1)
        }
      }

      // ---- structure: mode, phrase, colour break
      const inBreak = t >= BREAKDOWN[0] && t < BREAKDOWN[1]
      const overridden = now < (e.overrideUntil || 0)
      if (!overridden) {
        const want = inBreak ? "wall" : CYCLE[Math.floor(t / (BAR * 4)) % CYCLE.length]
        if (want !== modeRef.current) setModeBoth(want)
      }
      const wantPhrase = Math.floor(t / (BAR * 8))
      if (wantPhrase !== phraseRef.current) {
        phraseRef.current = wantPhrase
        setPhraseIdx(wantPhrase)
      }
      const wantRgb = inBreak || now < (e.rgbHold || 0)
      if (wantRgb !== e.rgbOn) {
        e.rgbOn = wantRgb
        setRgb(wantRgb)
      }

      // ---- wall rows slide, faster with the bass, alternating direction
      rows.forEach((row, i) => {
        const w = e.rowW?.[i] || 0
        if (!w) return
        e.rowX[i] = (e.rowX[i] || 0) + dt * (30 + i * 14 + e.bass * 520) * (i % 2 ? -1 : 1)
        const x = ((e.rowX[i] % w) + w) % w
        row.style.transform = `translate3d(${-x}px,0,0)`
      })

      // ---- words tear away from the pointer
      if (words.length) {
        const R = 220
        const reads = words.map((el, i) => {
          const r = el.getBoundingClientRect()
          const o = e.offs[i]
          return { cx: r.left + r.width / 2 - o.x, cy: r.top + r.height / 2 - o.y }
        })
        words.forEach((el, i) => {
          const o = e.offs[i]
          const dx = reads[i].cx - e.px
          const dy = reads[i].cy - e.py
          const d = Math.hypot(dx, dy) || 1
          let tx = 0
          let ty = 0
          if (d < R) {
            const push = Math.pow(1 - d / R, 2) * 90
            tx = (dx / d) * push
            ty = (dy / d) * push
          }
          o.x += (tx - o.x) * 0.18
          o.y += (ty - o.y) * 0.18
          el.style.translate = Math.abs(o.x) + Math.abs(o.y) < 0.2 ? "" : `${o.x.toFixed(1)}px ${o.y.toFixed(1)}px`
        })
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [playing, setModeBoth])

  // track ended -> back to the idle wall
  useEffect(() => {
    const audio = audioRef.current
    const onEnded = () => {
      setPlaying(false)
      setStarted(false)
      setRgb(false)
      phraseRef.current = 0
      setPhraseIdx(0)
    }
    audio.addEventListener("ended", onEnded)
    return () => audio.removeEventListener("ended", onEnded)
  }, [])

  function onStageClick(ev) {
    if (!started || ev.target.closest(".k-controls")) return
    const next = CYCLE[(CYCLE.indexOf(modeRef.current) + 1) % CYCLE.length]
    setModeBoth(next, 12)
  }

  return (
    <section
      ref={stageRef}
      className={`kinetic ${started ? "is-live" : "is-idle"} ${rgb ? "rgb" : ""}`}
      data-mode={mode}
      onClick={onStageClick}
    >
      <audio ref={audioRef} src={TRACK} preload="none" />

      {!started && (
        <div className="k-idle">
          <TiledTitle text="Aduaine" rows={4} font="veloce" as="div" />
        </div>
      )}

      {started && mode !== "wall" && (
        <div className="k-words" key={`${mode}-${phraseIdx}`} role="img" aria-label="Aduaine">
          {phrase.map((w, i) => (
            <span key={i} className="k-word" style={{ "--i": i }}>{w}</span>
          ))}
        </div>
      )}

      {started && mode === "wall" && (
        <div className="k-wall" key={`wall-${phraseIdx}`} role="img" aria-label="Aduaine">
          {Array.from({ length: WALL_ROWS }, (_, i) => (
            <span key={i} className="k-row" style={{ "--i": i }}>
              {Array.from({ length: REPEATS }, (_, j) => (
                <span key={j}>{phrase[i % phrase.length]}</span>
              ))}
            </span>
          ))}
        </div>
      )}

      <div className="k-controls">
        <button type="button" className="k-play" onClick={(ev) => { ev.stopPropagation(); togglePlay() }}>
          {playing ? "Pause" : "Play"}
        </button>
        <span className="k-now">Sleep Underwriter / Kalpol OZ</span>
        <span className="k-legend">Q W E R mode · T break · space · F full</span>
      </div>
      <div className="k-progress" />
    </section>
  )
}

export default KineticHero
