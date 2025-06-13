import React from 'react';
import './App.css';
import CountrySelector from './CountrySelector';
import GiniPyramid from './GiniPyramid';
import DebtComparison from './DebtComparison';
import P90P10Ratio from './P90P10Ratio';


function App() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <CountrySelector />
      <GiniPyramid />
      <DebtComparison />
      <P90P10Ratio />
    </div>
  );
}

export default App;

