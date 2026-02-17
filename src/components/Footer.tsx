import SocialLinks from './SocialLinks';

function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FAEM. All rights reserved.</p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
