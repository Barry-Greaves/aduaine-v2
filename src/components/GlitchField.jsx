import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

// Fixed full-screen WebGL backdrop: near-black with faint hard-edged blades,
// scanlines, and row-slip / RGB colour-break "events". Everything is
// rectilinear on purpose (no circles, no soft vignette).
//
// Trigger an event from anywhere:
//   window.dispatchEvent(new CustomEvent("aduaine-glitch", { detail: { power: 1 } }))

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uBurst;
uniform vec2 uMouse;
uniform float uScroll;

float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

// luminance of the blade field at a point
float field(vec2 uv, float t) {
  // horizontal row slips, only while a burst is running
  float row = floor(uv.y * 44.0);
  float slipOn = step(0.62, hash(row * 3.7 + floor(t * 9.0)));
  float slip = (hash(row + floor(t * 9.0)) - 0.5) * 0.5 * uBurst * slipOn;
  float x = uv.x + slip;

  // slow vertical blades
  float vb = step(0.88, hash(floor((x + t * 0.008) * 22.0) + 7.0)) * 0.085;
  // slow horizontal bars drifting with scroll
  float hb = step(0.91, hash(floor(uv.y * 9.0 - t * 0.02 - uScroll * 3.0) + 3.0)) * 0.07;
  // wide low-contrast slabs
  float slab = step(0.78, hash(floor((x - t * 0.004) * 5.0) + 31.0)) * 0.03;
  return vb + hb + slab;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float t = uTime;

  // colour break: each channel samples the field at a different offset
  float cb = uBurst * 0.028;
  float r = field(uv + vec2(cb, 0.0), t);
  float g = field(uv, t);
  float b = field(uv - vec2(cb, 0.0), t);

  // a hard band of extra slip that follows the cursor row
  float near = step(abs(uv.y - uMouse.y), 0.012 + 0.03 * uBurst);
  float mSlip = near * uBurst * 0.5;
  r += field(uv + vec2(0.05, 0.0), t) * mSlip;
  b += field(uv - vec2(0.05, 0.0), t) * mSlip;

  vec3 col = vec3(0.0588) + vec3(r, g, b);

  // scanlines
  float scan = 0.5 + 0.5 * sin(gl_FragCoord.y * 3.14159);
  col *= 0.94 + 0.06 * scan;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
}

function GlitchField() {
  const canvasRef = useRef(null)
  const location = useLocation()

  // a burst on every route change
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("aduaine-glitch", { detail: { power: 1 } })
    )
  }, [location.pathname])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      burst: gl.getUniformLocation(prog, "uBurst"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      scroll: gl.getUniformLocation(prog, "uScroll"),
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const SCALE = 0.5 // render at half resolution, the CSS scales it up
    let burst = 0
    let mouseY = 0.5
    let scroll = 0
    let raf = 0
    let last = performance.now()
    let idleAt = last + 6000
    const t0 = last

    function resize() {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    function onGlitch(e) {
      if (reduced) return
      burst = Math.max(burst, e.detail?.power ?? 1)
    }
    function onMove(e) {
      mouseY = 1 - e.clientY / window.innerHeight
    }
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll = max > 0 ? window.scrollY / max : 0
    }

    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now

      if (!reduced && now > idleAt) {
        burst = Math.max(burst, 0.35)
        idleAt = now + 8000 + Math.random() * 8000
      }
      burst *= Math.exp(-dt * 3.2)
      if (burst < 0.002) burst = 0

      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, reduced ? 0 : (now - t0) / 1000)
      gl.uniform1f(u.burst, burst)
      gl.uniform2f(u.mouse, 0.5, mouseY)
      gl.uniform1f(u.scroll, scroll)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    function onVisibility() {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    onScroll()
    window.addEventListener("resize", resize)
    window.addEventListener("aduaine-glitch", onGlitch)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("aduaine-glitch", onGlitch)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="glitch-field" aria-hidden="true" />
}

export default GlitchField
