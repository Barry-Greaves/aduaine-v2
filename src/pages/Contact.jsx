import TiledTitle from "../components/TiledTitle"

function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`[${f.get("type")}] ${f.get("name") || "Enquiry"}`)
    const body = encodeURIComponent(`${f.get("message")}\n\n${f.get("name")} <${f.get("email")}>`)
    window.location.href = `mailto:aduainemusic@email.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="page contact-page">
      <header className="page-header">
        <TiledTitle text="Contact" rows={2} font="adina" />
        <p className="page-sub">Signal / Transmission / Enquiries</p>
      </header>

      <section className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Enquiry Type
            <select name="type">
              <option>General</option>
              <option>Releases</option>
              <option>Visual / Video</option>
              <option>Collaboration</option>
            </select>
          </label>

          <label>
            Message
            <textarea name="message" rows="7" required />
          </label>

          <button type="submit" className="contact-submit">
            Send Transmission
          </button>
        </form>

        <aside className="contact-info">
          <div>
            <h2>Label</h2>
            <p>Aduaine</p>
          </div>

          <div>
            <h2>Email</h2>
            <a href="mailto:aduainemusic@email.com">aduainemusic@email.com</a>
          </div>

          <div>
            <h2>Links</h2>
            <a href="https://aduaine.bandcamp.com" target="_blank" rel="noreferrer">
              Bandcamp
            </a>
            <a href="https://youtube.com/@Aduaine" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://instagram.com/aduainemusic" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Contact
