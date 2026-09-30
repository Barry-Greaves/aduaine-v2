import { releases } from "../data/releases"
import ReleaseCard from "../components/ReleaseCard"
import TiledTitle from "../components/TiledTitle"

function Releases() {
  return (
    <main className="page releases-page">
      <header className="page-header">
        <TiledTitle text="Releases" rows={2} font="adina" />
        <p className="page-sub">Catalogue archive / {releases.length} entries</p>
      </header>

      <section className="release-grid">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </section>
    </main>
  )
}

export default Releases
