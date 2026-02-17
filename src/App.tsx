import Footer from './components/Footer';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DiscographyPage from './pages/DiscographyPage';
import HomePage from './pages/HomePage';

const routeMap: Record<string, JSX.Element> = {
  '/': <HomePage />,
  '/music': <DiscographyPage />,
  '/about': <AboutPage />,
  '/contact': <ContactPage />
};

function App() {
  const currentPath = window.location.pathname;
  const page = routeMap[currentPath] ?? <HomePage />;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-12">{page}</main>
      <Footer />
    </div>
  );
}

export default App;
