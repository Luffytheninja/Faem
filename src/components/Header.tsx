import { navLinks } from '../data/navigation';

function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
        <a className="text-xl font-semibold tracking-wide text-accent" href="/">
          FAEM
        </a>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          {navLinks.map((link) => (
            <a key={link.href} className="hover:text-accent" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
