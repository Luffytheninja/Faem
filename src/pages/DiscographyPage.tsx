import { releases } from '../data/discography';

function DiscographyPage() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold">Music / Discography</h1>
      <div className="grid gap-4">
        {releases.map((release) => (
          <article key={release.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm uppercase tracking-widest text-accent">
              {release.type} • {release.year}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{release.title}</h2>
            <p className="mt-3 text-zinc-300">{release.description}</p>
          </article>
        ))}
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">Embedded Player Placeholder</h2>
        <p className="mt-2 text-zinc-300">
          Add your streaming embed using <code>VITE_SPOTIFY_EMBED_URL</code> or other embed env
          variables from <code>.env</code>.
        </p>
      </div>
    </section>
  );
}

export default DiscographyPage;
