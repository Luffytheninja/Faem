import StreamingButtons from '../components/StreamingButtons';

function HomePage() {
  return (
    <section className="space-y-8">
      <p className="text-sm uppercase tracking-[0.3em] text-accent">New Era</p>
      <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
        Atmospheric alt-pop from the heart of the underground.
      </h1>
      <p className="max-w-3xl text-lg text-zinc-300">
        FAEM fuses cinematic synths, textured vocals, and pulse-driving rhythms to build songs
        that feel both intimate and explosive.
      </p>
      <div className="flex flex-wrap gap-4">
        <a className="rounded-full bg-accent px-6 py-3 font-semibold text-zinc-900" href="/music">
          Listen Now
        </a>
        <a className="rounded-full border border-zinc-700 px-6 py-3 font-semibold" href="/contact">
          Book / Contact
        </a>
      </div>
      <StreamingButtons />
    </section>
  );
}

export default HomePage;
