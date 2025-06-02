import React, { useState } from 'react';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function buscarVoos() {
    if (!origin || !destination || !departureDate) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);
    setError(null);
    setFlights(null);

    try {
      const response = await fetch(
        `/api/flights?origin=${origin.toUpperCase()}&destination=${destination.toUpperCase()}&departureDate=${departureDate}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar voos');
      }
      const data = await response.json();
      setFlights(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Busca de Voos</h1>

      <div style={{ marginBottom: 10 }}>
        <label>Origem (código IATA): </label>
        <input
          type="text"
          placeholder="Ex: GRU"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          maxLength={3}
          style={{ textTransform: 'uppercase', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Destino (código IATA): </label>
        <input
          type="text"
          placeholder="Ex: JFK"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          maxLength={3}
          style={{ textTransform: 'uppercase', width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Data de ida: </label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <button onClick={buscarVoos} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Buscando...' : 'Buscar Voos'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flights && flights.length === 0 && <p>Nenhum voo encontrado.</p>}

      {flights && flights.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Resultados:</h2>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                <strong>{flight.itineraries[0].segments[0].departure.iataCode}</strong> →{' '}
                <strong>{flight.itineraries[0].segments[0].arrival.iataCode}</strong> |{' '}
                {flight.itineraries[0].segments[0].departure.at.substring(0, 10)} | Preço:{' '}
                {flight.price.total} {flight.price.currency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
