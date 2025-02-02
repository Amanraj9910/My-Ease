import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepTree } from './components/StepTree';
import { ExpertCall } from './components/ExpertCall';
import { Chatbot } from './components/Chatbot';
import { Pricing } from './components/Pricing';
import { ProcessGuide } from './pages/ProcessGuide';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <StepTree />
              <ExpertCall />
              <Pricing />
              <Chatbot />
            </main>
          } />
          <Route path="/process/:id" element={<ProcessGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App