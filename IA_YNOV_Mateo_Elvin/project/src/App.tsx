import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import About from './components/About';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Chatbot from './components/chat/Chatbot';

function App() {
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleExplore = useCallback((destinationId: string) => {
    setSelectedDestination(destinationId);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, []);

  return (
    <div className="bg-dark-950 text-dark-200">
      <Navbar />
      <Hero />
      <Destinations onExplore={handleExplore} />
      <About />
      <Booking selectedDestination={selectedDestination} />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
