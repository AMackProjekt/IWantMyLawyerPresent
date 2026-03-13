import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FounderBio from './components/FounderBio';
import LegalRightsWalletCard from './components/LegalRightsWalletCard';
import ImpactSection from './components/ImpactSection';
import DataVisualization from './components/DataVisualization';
import WhyItMatters from './components/WhyItMatters';
import Shop from './components/Shop';
import SupportMovement from './components/SupportMovement';
import Checkout from './components/Checkout';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <FounderBio />
        <LegalRightsWalletCard />
        <Shop />
        <SupportMovement />
        <ImpactSection />
        <DataVisualization />
        <WhyItMatters />
        <Checkout />
        <CallToAction />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
