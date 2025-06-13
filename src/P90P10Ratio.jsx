import React, { useState } from 'react';

const P90P10Ratio = () => {
  const [inputData, setInputData] = useState({
    population: 1428600000,
    nni: 257305146000000,
    geni: 0.328,
    alpha: 1.695652
  });

  const [ratio, setRatio] = useState(null);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRatio(null);

    try {
      const response = await fetch('https://api.antsanalyzer.com/gini/api/algo4/compute-p90p10', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setRatio(data.p90p10_ratio);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h2 style={{ textAlign: 'center', color: '#4b0082' }}>P90/P10 Income Ratio Calculator</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>Population:</label>
        <input type="number" name="population" value={inputData.population} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <label>NNI:</label>
        <input type="number" name="nni" value={inputData.nni} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <label>Gini Index:</label>
        <input type="number" step="0.001" name="geni" value={inputData.geni} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <label>Alpha:</label>
        <input type="number" step="0.000001" name="alpha" value={inputData.alpha} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4b0082', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Calculate Ratio
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {ratio && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '6px' }}>
          <h3 style={{ color: '#333' }}>Result</h3>
          <p><strong>P90/P10 Ratio:</strong> {ratio.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default P90P10Ratio;
