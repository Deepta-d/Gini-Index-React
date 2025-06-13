import React, { useState } from 'react';

const GiniPyramid = () => {
  const [formData, setFormData] = useState({
    pop: 1428600000,
    geni_i: 0.328,
    gni: 257305146000000,
    pct: [0, 10.0, 30.0, 50.0, 80.0, 90.0, 95.0, 98.0, 100.0],
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('https://api.antsanalyzer.com/gini/api/algo1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h2 style={{ textAlign: 'center', color: '#4b0082' }}>Gini Pyramid Index Calculator</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Population:</label>
          <input
            type="number"
            value={formData.pop}
            onChange={(e) => setFormData({ ...formData, pop: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Gini Index:</label>
          <input
            type="number"
            step="0.001"
            value={formData.geni_i}
            onChange={(e) => setFormData({ ...formData, geni_i: parseFloat(e.target.value) })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>GNI:</label>
          <input
            type="number"
            value={formData.gni}
            onChange={(e) => setFormData({ ...formData, gni: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4b0082', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Calculate
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {result && (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', color: '#000' }}>
          <h3 style={{ color: '#3366cc' }}>Results:</h3>
          <p><strong>Alpha:</strong> {result.alpha}</p>
          <p><strong>Gini Index:</strong> {result.geni}</p>

          <div>
            <h4>Population Distribution (p):</h4>
            <ul>{result.p?.map((val, i) => <li key={i}>Group {i + 1}: {Math.round(val).toLocaleString()}</li>)}</ul>
          </div>

          <div>
            <h4>Income Share (is):</h4>
            <ul>{result.is?.map((val, i) => <li key={i}>Group {i + 1}: {Math.round(val).toLocaleString()}</li>)}</ul>
          </div>

          <div>
            <h4>Average Income (Ai):</h4>
            <ul>{result.Ai?.map((val, i) => <li key={i}>Group {i + 1}: {val}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiniPyramid;