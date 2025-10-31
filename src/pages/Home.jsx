import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import Hero from '../components/landing-components/Hero';
import OurProcess from '../components/landing-components/OurProcess';
import FeaturedProducts from '../components/landing-components/FeaturedProducts';
import WeBuildSolutionsForWeb3 from '../components/landing-components/WeBuildSolutionsForWeb3';
import { OurTeam } from '../components/landing-components/OurTeam';
import { CTA } from '../components/cta/CTA';
import './Home.css';

export default function Home() {
  const [txHash, setTxHash] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (txHash.trim()) {
      navigate(`/graph/${txHash.trim()}`);
    }
  };

  return (
    <div className="bg-sui-bg min-h-screen overflow-hidden relative">
      <Navbar />
      <Hero />

      {/* Prominent Transaction Input Section */}
      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[90] tx-form-overlay">
          <div className="bg-sui-bg/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-ashyBorder max-w-2xl w-[90vw]">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
            >
              ×
            </button>

            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 text-center">
              Analyze a Transaction
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 text-center">
              Enter a Sui transaction hash to visualize its flow
            </p>

            <form onSubmit={handleSubmit} className="tx-form">
              <div className="input-group flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Enter transaction hash..."
                  className="tx-input flex-1 px-4 py-3 rounded-lg bg-white/5 border border-ashyBorder text-white placeholder-white/40 focus:outline-none focus:border-sui-blue transition-colors"
                />
                <button
                  type="submit"
                  className="submit-button px-6 py-3 bg-gradient-to-r from-sui-blue to-sui-blue-dark text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-sui-blue/30 transition-all"
                >
                  View Graph
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/graph/demo')}
                className="text-sui-blue hover:text-sui-blue-dark text-sm underline"
              >
                Or try a demo transaction
              </button>
            </div>
          </div>
        </div>
      )}

      <OurProcess />
      <FeaturedProducts />
      <WeBuildSolutionsForWeb3 />
      <OurTeam />
      <CTA />
    </div>
  );
}


