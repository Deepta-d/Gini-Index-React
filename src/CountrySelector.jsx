import React, { useEffect, useState } from 'react';

const CountrySelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Fetch country list on mount
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.antsanalyzer.com/gini/api/countries');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);

          const indiaCountry = data.find(c => c.Country.toUpperCase() === 'India');

          if (indiaCountry) {
            setSelectedCountry(indiaCountry);
          } else {
            setSelectedCountry(data[0]);
          }
        } else {
          console.error('No countries returned from API');
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const countryName = e.target.value;
    const country = countries.find(c => c.Country === countryName);
    setSelectedCountry(country);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6126A8', textAlign: 'center' }}>
        GiniIndex.com
      </h1>

    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#6126A8', textAlign: 'center' }}>
        Select a Country
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="country" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          Country:
        </label>
        <select
          id="country"
          onChange={handleChange}
          value={selectedCountry?.Country || ''}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#333', color: '#fff' }}
        >
          {countries.map((country) => (
            <option key={country.Country_ID} value={country.Country}>
              {country.Country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', color: '#000' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3366cc', marginBottom: '12px' }}>{selectedCountry.Country}</h3>
          <p><strong>Population:</strong> {selectedCountry.Population.toLocaleString()}</p>
          <p><strong>Currency:</strong> {selectedCountry.Currency}</p>
          <p><strong>Gross National Income (GNI):</strong> {selectedCountry.GNI.toLocaleString()}</p>
          <p><strong>Gini Coefficient:</strong> {selectedCountry.Gini_Coefficient}</p>
          <p><strong>Median Annual Income:</strong> {selectedCountry.Median_Annual_Income.toLocaleString()}</p>
          <p><strong>Minimum Annual Earning:</strong> {selectedCountry.Minimum_Annual_Earning.toLocaleString()}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default CountrySelector;
