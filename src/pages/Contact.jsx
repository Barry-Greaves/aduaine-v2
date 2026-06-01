import { motion } from "framer-motion"
import DecodeTitle from "../components/DecodeTitle"

function Contact() {
  return (
    <main className="contact-page">
      <header className="page-header">
        <DecodeTitle text="CONTACT" className="releases-title decode-title" />

        <p>Signal / Transmission / Enquiries</p>
      </header>

      <section className="contact-grid">
        <form className="contact-form">
          <label>
            Name
            <input type="text" name="name" />
          </label>

          <label>
            Email
            <input type="email" name="email" />
          </label>

          <label>
            Enquiry Type
            <select name="type">
              <option>General</option>
              <option>Releases</option>
              <option>Merch</option>
              <option>Visual / Video</option>
              <option>Collaboration</option>
            </select>
          </label>

          <label>
            Message
            <textarea name="message" rows="7" />
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
            <a href="https://www.etsy.com/shop/Aduaine" target="_blank" rel="noreferrer">
              Etsy
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