import { streamingPlatforms } from '../data/streaming';

function StreamingButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      {streamingPlatforms.map((platform) => (
        <a
          key={platform.href}
          className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-accent hover:text-accent"
          href={platform.href}
          rel="noreferrer"
          target="_blank"
        >
          {platform.label}
        </a>
      ))}
    </div>
  );
}

export default StreamingButtons;
