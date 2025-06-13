import React, { useState } from 'react';

const DebtComparison = () => {
  const [inputData, setInputData] = useState({
    mon_inc: 40000,
    mon_debt: 10000,
    population: 1428600000,
    nni: 257305146000000,
    alpha: 1.695652,
    geni: 0.328,
    dependents: 2
  });

  const [noDebtPct, setNoDebtPct] = useState(null);
  const [withDebtPct, setWithDebtPct] = useState(null);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setNoDebtPct(null);
    setWithDebtPct(null);

    try {
      const [res1, res2] = await Promise.all([
        fetch('https://api.antsanalyzer.com/gini/api/algo2/compute-user-nodebt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mon_inc: inputData.mon_inc,
            population: inputData.population,
            nni: inputData.nni,
            alpha: inputData.alpha,
            geni: inputData.geni,
            dependents: inputData.dependents
          })
        }),
        fetch('https://api.antsanalyzer.com/gini/api/algo3/compute-user-withdebt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputData)
        })
      ]);

      if (!res1.ok || !res2.ok) throw new Error('API request failed');

      const data1 = await res1.json();
      const data2 = await res2.json();

      setNoDebtPct((data1.pct_low * 100).toFixed(2));
      setWithDebtPct((data2.pct_low * 100).toFixed(2));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h2 style={{ textAlign: 'center', color: '#4b0082' }}>Debt Impact on Gini Position</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label>Monthly Income:</label>
        <input type="number" name="mon_inc" value={inputData.mon_inc} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <label>Monthly Debt:</label>
        <input type="number" name="mon_debt" value={inputData.mon_debt} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <label>Dependents:</label>
        <input type="number" name="dependents" value={inputData.dependents} onChange={handleInput} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4b0082', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Calculate Percentile
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {noDebtPct && withDebtPct && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '6px' }}>
          <h3 style={{ color: '#333' }}>Results</h3>
          <p><strong>Without Debt:</strong> {noDebtPct}% of the population earns less than you.</p>
          <p><strong>With Debt:</strong> {withDebtPct}% of the population earns less than you (adjusted).</p>
        </div>
      )}
    </div>
  );
};

export default DebtComparison;
