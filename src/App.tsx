import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FounderBio from './components/FounderBio';
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
        <ImpactSection />
        <DataVisualization />
        <WhyItMatters />
        <Shop />
        <SupportMovement />
        <Checkout />
        <CallToAction />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
