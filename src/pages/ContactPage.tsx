import SocialLinks from '../components/SocialLinks';

function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold">Contact / Links</h1>
      <p className="text-zinc-300">
        For booking, press, collaborations, and sync inquiries, email
        <a className="ml-1 text-accent" href="mailto:hello@faemmusic.com">
          hello@faemmusic.com
        </a>
        .
      </p>
      <SocialLinks />
    </section>
  );
}

export default ContactPage;
