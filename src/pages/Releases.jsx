import { releases } from "../data/releases"
import ReleaseCard from "../components/ReleaseCard"

function Releases() {
  return (
    <main className="releases-page">
      <header className="page-header">
        <h1>RELEASES</h1>
        <p>Catalogue archive</p>
      </header>

      <section className="release-grid">
        {releases.map((release) => (
          <ReleaseCard
            key={release.id}
            release={release}
          />
        ))}
      </section>
    </main>
  )
}

export default Releases