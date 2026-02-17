import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import DataVisualization from './components/DataVisualization';
import WhyItMatters from './components/WhyItMatters';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ImpactSection />
      <DataVisualization />
      <WhyItMatters />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
