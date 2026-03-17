import Navigation from './components/Navigation';
import LaunchSpotlight from './components/LaunchSpotlight';
import Hero from './components/Hero';
import FounderBio from './components/FounderBio';
import LegalRightsWalletCard from './components/LegalRightsWalletCard';
import Shop from './components/Shop';
import VideoClips from './components/VideoClips';
import SupportMovement from './components/SupportMovement';
import Checkout from './components/Checkout';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import AdminEditor from './components/AdminEditor';
import { CartProvider } from './CartProvider';
import { SiteContentProvider } from './context/SiteContentContext';

function App() {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/admin');

  return (
    <SiteContentProvider>
      {isAdminRoute ? (
        <AdminEditor />
      ) : (
        <CartProvider>
          <div className="min-h-screen">
            <Navigation />
            <LaunchSpotlight />
            <Hero />
            <FounderBio />
            <LegalRightsWalletCard />
            <Shop />
            <VideoClips />
            <SupportMovement />
            <Checkout />
            <CallToAction />
            <Footer />
          </div>
        </CartProvider>
      )}
    </SiteContentProvider>
  );
}

export default App;
