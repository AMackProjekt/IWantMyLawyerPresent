import Navigation from './components/Navigation';
import LaunchSpotlight from './components/LaunchSpotlight';
import Hero from './components/Hero';
import FounderBio from './components/FounderBio';
import Shop from './components/Shop';
import VideoClips from './components/VideoClips';
import SupportMovement from './components/SupportMovement';
import Checkout from './components/Checkout';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { CartProvider } from './CartProvider';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navigation />
        <LaunchSpotlight />
        <Hero />
        <FounderBio />
        <Shop />
        <VideoClips />
        <SupportMovement />
        <Checkout />
        <CallToAction />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
