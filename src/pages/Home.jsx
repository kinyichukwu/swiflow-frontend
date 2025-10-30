import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [txHash, setTxHash] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (txHash.trim()) {
      navigate(`/graph/${txHash.trim()}`);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Swiflow</h1>
        <p className="home-subtitle">Visualize blockchain transactions in a graph</p>
        
        <form onSubmit={handleSubmit} className="tx-form">
          <div className="input-group">
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Enter transaction hash..."
              className="tx-input"
            />
            <button type="submit" className="submit-button">
              View Graph
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


