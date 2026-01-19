import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MainBrowser from './components/MainBrowser';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [targetSection, setTargetSection] = useState('methods');

  const handleStart = () => {
    setTargetSection('methods');
    setShowLanding(false);
  };

  const handleNavigate = (sectionId: string) => {
    setTargetSection(sectionId);
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onStart={handleStart} onNavigate={handleNavigate} />;
  }

  return <MainBrowser initialSection={targetSection} onBack={handleBackToLanding} />;
}