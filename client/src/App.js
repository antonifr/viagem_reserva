import React, { useState } from 'react';

const cidades = [

  { nome: 'Aracaju - Aeroporto Internacional de Aracaju; Santa Maria; Aracaju/SE', codigo: 'AJU' },
  { nome: 'Belém - Aeroporto Internacional de Belém; Val de Cans; Belém/PA', codigo: 'BEL' },
  { nome: 'Porto Seguro - Aeroporto Internacional de Porto Seguro; Porto Seguro/BA', codigo: 'BPS' },
  { nome: 'Brasília - Aeroporto Internacional de Brasília; Presidente Juscelino Kubitschek; Brasília/DF', codigo: 'BSB' },
  { nome: 'Boa Vista - Aeroporto Internacional de Boa Vista; Atlas Brasil Cantanhede; Boa Vista/RR', codigo: 'BVB' },
  { nome: 'Cabo Frio - Aeroporto de Cabo Frio; Cabo Frio/RJ', codigo: 'CFB' },
  { nome: 'São Paulo - Aeroporto Internacional de Congonhas; São Paulo/SP', codigo: 'CGH' },
  { nome: 'Campo Grande - Aeroporto de Campo Grande; Campo Grande/MS', codigo: 'CGR' },
  { nome: 'Cuiabá - Aeroporto Internacional de Cuiabá; Marechal Rondon; Cuiabá/MT', codigo: 'CGB' },
  { nome: 'Cruzeiro do Sul - Aeroporto Internacional de Cruzeiro do Sul; Cruzeiro do Sul/AC', codigo: 'CZS' },
  { nome: 'Curitiba - Aeroporto Internacional de Curitiba; Afonso Pena; Curitiba/PR', codigo: 'CWB' },
  { nome: 'Caxias do Sul - Aeroporto Internacional de Caxias do Sul; Hugo Cantergiani; Caxias do Sul/RS', codigo: 'CXJ' },
  { nome: 'Fernando de Noronha - Aeroporto Internacional de Fernando de Noronha; Fernando de Noronha/PE', codigo: 'FEN' },
  { nome: 'Florianópolis - Aeroporto Internacional de Florianópolis; Hercílio Luz; Florianópolis/SC', codigo: 'FLN' },
  { nome: 'Fortaleza - Aeroporto Internacional de Fortaleza; Pinto Martins; Fortaleza/CE', codigo: 'FOR' },
  { nome: 'Goiânia - Aeroporto de Goiânia; Santa Genoveva; Goiânia/GO', codigo: 'GYN' },
  { nome: 'Guarulhos - Aeroporto de São Paulo: Guarulhos; Governador André Franco Motoro; Guarulhos/SP', codigo: 'GRU' },
  { nome: 'Foz do Iguaçu - Aeroporto Internacional de Foz do Iguaçu; Foz do Iguaçu/PR', codigo: 'IGU' },
  { nome: 'Ilhéus - Aeroporto de Ilhéus; Jorge Amado; Ilhéus/BA', codigo: 'IOS' },
  { nome: 'Imperatriz - Aeroporto de Imperatriz; Prefeito Renato Moreira; Imperatriz/MA', codigo: 'IMP' },
  { nome: 'Juazeiro do Norte - Aeroporto Internacional de Juazeiro do Norte; Orlando Bezerra; Juazeiro do Norte/CE', codigo: 'JDO' },
  { nome: 'Joinville - Aeroporto Internacional de Joinville; Lauro Carneiro de Loyola; Joinville/SC', codigo: 'JOI' },
  { nome: 'João Pessoa - Aeroporto Internacional de João Pessoa; Presidente Castro Pinto; João Pessoa/PB', codigo: 'JPA' },
  { nome: 'Londrina - Aeroporto de Londrina; Governador José Richa; Londrina/PR', codigo: 'LDB' },
  { nome: 'Manaus - Aeroporto Internacional de Manaus; Eduardo Gomes; Manaus/AM', codigo: 'MAO' },
  { nome: 'Marabá - Aeroporto de Marabá; Marabá/PA', codigo: 'MAB' },
  { nome: 'Macapá - Aeroporto Internacional de Macapá; Macapá/AP', codigo: 'MCP' },
  { nome: 'Maceió - Aeroporto de Maceió; Zumbi dos Palmares; Maceió/AL', codigo: 'MCZ' },
  { nome: 'Maringá - Aeroporto Internacional de Maringá; Silvio Name Junior; Maringá/PR', codigo: 'MGF' },
  { nome: 'Montes Claros - Aeroporto de Montes Claros; Mário Ribeiro; Montes Claros/MG', codigo: 'MOC' },
  { nome: 'Natal - Aeroporto de Natal; Augusto Severo; Natal/RN', codigo: 'NAT' },
  { nome: 'Navegantes - Aeroporto de Navegantes; Ministro Victor Konder; Navegantes/SC', codigo: 'NVT' },
  { nome: 'Palmas - Aeroporto de Palmas; Brigadeiro Lysias Rodrigues; Palmas/TO', codigo: 'PMW' },
  { nome: 'Petrolina - Aeroporto de Petrolina; Senador Nilo Coelho; Petrolina/PE', codigo: 'PNZ' },
  { nome: 'Porto Alegre - Aeroporto de Porto Alegre; Salgado Filho; Porto Alegre/RS', codigo: 'POA' },
  { nome: 'Presidente Prudente - Aeroporto de Presidente Prudente; Presidente Prudente/SP', codigo: 'PPB' },
  { nome: 'Porto Velho - Aeroporto de Porto Velho; Governador Jorge Teixeira de Oliveira; Porto Velho/RO', codigo: 'PVH' },
  { nome: 'Rio Branco - Aeroporto Internacional de Rio Branco; Plácido de Castro; Rio Branco/AC', codigo: 'RBR' },
  { nome: 'Recife - Aeroporto Internacional de Recife; Guararapes – Gilberto Freyre; Recife/PE', codigo: 'REC' },
  { nome: 'Rio de Janeiro - Aeroporto Santos Dumont; Rio de Janeiro/RJ', codigo: 'SDU' },
  { nome: 'São José dos Campos - Aeroporto Internacional de São José dos Campos; Professor Urbano Ernesto Stumpf; São José dos Campos/SP', codigo: 'SJK' },
  { nome: 'Salvador - Aeroporto de Salvador; Deputado Luís Eduardo Magalhães; Salvador/BA', codigo: 'SSA' },
  { nome: 'São Luís - Aeroporto de São Luís; Marechal Cunha Machado; São Luís/MA', codigo: 'SLZ' },
  { nome: 'Santarém - Aeroporto de Santarém; Maestro Wilson Fonseca; Santarém/PA', codigo: 'STM' },
  { nome: 'Teresina - Aeroporto de Teresina; Senador Petrônio Portella; Teresina/PI', codigo: 'THE' },
  { nome: 'Uberlândia - Aeroporto de Uberlândia; Ten. Cel. Av. César Bombonato; Uberlândia/MG', codigo: 'UDI' },
  { nome: 'Campinas - Aeroporto Internacional de Viracopos; Campinas; Campinas/SP', codigo: 'VCP' },
  { nome: 'Vitória - Aeroporto de Vitória; Eurico de Aguiar Salles; Vitória/ES', codigo: 'VIX' },
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
