import React, { useState } from 'react';

const cidades = [
  { nome: 'São Paulo', codigo: 'GRU' },
  { nome: 'Rio de Janeiro', codigo: 'GIG' },
  { nome: 'Brasília', codigo: 'BSB' },
  { nome: 'New York', codigo: 'JFK' },
  { nome: 'Los Angeles', codigo: 'LAX' },
  { nome: 'Miami', codigo: 'MIA' },
  { nome: 'Londres', codigo: 'LHR' },
  { nome: 'Paris', codigo: 'CDG' },
  // Adicione mais cidades que quiser aqui
];

function AutocompleteInput({ label, value, onChange }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sugestões = cidades.filter(
    (c) =>
      c.nome.toLowerCase().includes(input.toLowerCase()) ||
      c.codigo.toLowerCase().includes(input.toLowerCase())
  );

  function selecionarCidade(cidade) {
    onChange(cidade.codigo);
    setInput(`${cidade.nome} (${cidade.codigo})`);
    setShowSuggestions(false);
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    onChange(''); // Limpa o código IATA ao digitar manualmente
    setShowSuggestions(true);
  }

  return (
    <div style={{ marginBottom: 10, position: 'relative' }}>
      <label style={{ display: 'block', marginBottom: 5 }}>{label}</label>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay para poder clicar na sugestão
        placeholder="Digite o nome da cidade ou código"
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
      {showSuggestions && input && (
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: '0 10px',
            border: '1px solid #ccc',
            maxHeight: 120,
            overflowY: 'auto',
            position: 'absolute',
            backgroundColor: 'white',
            width: '100%',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          {sugestões.length === 0 && <li style={{ padding: 5 }}>Nenhuma cidade encontrada.</li>}
          {sugestões.map((cidade) => (
            <li
              key={cidade.codigo}
              onClick={() => selecionarCidade(cidade)}
              style={{ padding: 5 }}
            >
              {cidade.nome} ({cidade.codigo})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
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
        `/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`
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

      <AutocompleteInput label="Origem" value={origin} onChange={setOrigin} />
      <AutocompleteInput label="Destino" value={destination} onChange={setDestination} />

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', marginBottom: 5 }}>Data de ida:</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
      </div>

      <button
        onClick={buscarVoos}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Buscando...' : 'Buscar Voos'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      {flights && flights.length === 0 && <p style={{ marginTop: 10 }}>Nenhum voo encontrado.</p>}

      {flights && flights.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Resultados:</h2>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id} style={{ marginBottom: 10 }}>
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
