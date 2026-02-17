import { socialLinks } from '../data/social';

function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {socialLinks.map((link) => (
        <li key={link.href}>
          <a className="hover:text-accent" href={link.href} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
