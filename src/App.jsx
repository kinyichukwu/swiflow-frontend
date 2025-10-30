import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Graph from './pages/Graph';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph/:txHash" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}