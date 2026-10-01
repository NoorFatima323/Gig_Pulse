import React, { useState } from 'react';
import './App.css';
import { MobileAppShell, NavTab } from './components/MobileAppShell';
import { ModuleOneOverview } from './components/ModuleOneOverview';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('pulse');

  return (
    <MobileAppShell activeTab={activeTab} setActiveTab={setActiveTab}>
      <ModuleOneOverview />
    </MobileAppShell>
  );
}

export default App;
