import React, { useState } from 'react';

const cidades = [
  { codigo: 'AJU', nome: 'Aracaju' },
  { codigo: 'BEL', nome: 'Belém' },
  { codigo: 'BPS', nome: 'Porto Seguro' },
  { codigo: 'BSB', nome: 'Brasília' },
  { codigo: 'BVB', nome: 'Boa Vista' },
  { codigo: 'CFB', nome: 'Cabo Frio' },
  { codigo: 'CGH', nome: 'São Paulo - Congonhas' },
  { codigo: 'CGR', nome: 'Campo Grande' },
  { codigo: 'CGB', nome: 'Cuiabá' },
  { codigo: 'CZS', nome: 'Cruzeiro do Sul' },
  { codigo: 'CWB', nome: 'Curitiba' },
  { codigo: 'CXJ', nome: 'Caxias do Sul' },
  { codigo: 'FEN', nome: 'Fernando de Noronha' },
  { codigo: 'FLN', nome: 'Florianópolis' },
  { codigo: 'FOR', nome: 'Fortaleza' },
  { codigo: 'GYN', nome: 'Goiânia' },
  { codigo: 'GRU', nome: 'São Paulo - Guarulhos' },
  { codigo: 'IGU', nome: 'Foz do Iguaçu' },
  { codigo: 'IOS', nome: 'Ilhéus' },
  { codigo: 'IMP', nome: 'Imperatriz' },
  { codigo: 'JDO', nome: 'Juazeiro do Norte' },
  { codigo: 'JOI', nome: 'Joinville' },
  { codigo: 'JPA', nome: 'João Pessoa' },
  { codigo: 'LDB', nome: 'Londrina' },
  { codigo: 'MAO', nome: 'Manaus' },
  { codigo: 'MAB', nome: 'Marabá' },
  { codigo: 'MCP', nome: 'Macapá' },
  { codigo: 'MCZ', nome: 'Maceió' },
  { codigo: 'MGF', nome: 'Maringá' },
  { codigo: 'MOC', nome: 'Montes Claros' },
  { codigo: 'NAT', nome: 'Natal' },
  { codigo: 'NVT', nome: 'Navegantes' },
  { codigo: 'PMW', nome: 'Palmas' },
  { codigo: 'PNZ', nome: 'Petrolina' },
  { codigo: 'POA', nome: 'Porto Alegre' },
  { codigo: 'PPB', nome: 'Presidente Prudente' },
  { codigo: 'PVH', nome: 'Porto Velho' },
  { codigo: 'RBR', nome: 'Rio Branco' },
  { codigo: 'REC', nome: 'Recife' },
  { codigo: 'SDU', nome: 'Rio de Janeiro - Santos Dumont' },
  { codigo: 'SJK', nome: 'São José dos Campos' },
  { codigo: 'SSA', nome: 'Salvador' },
  { codigo: 'SLZ', nome: 'São Luís' },
  { codigo: 'STM', nome: 'Santarém' },
  { codigo: 'THE', nome: 'Teresina' },
  { codigo: 'UDI', nome: 'Uberlândia' },
  { codigo: 'VCP', nome: 'Campinas - Viracopos' },
  { codigo: 'VIX', nome: 'Vitória' },
];

function App() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [voos, setVoos] = useState([]);

  const buscarVoos = async () => {
    try {
      const response = await fetch(
        `/api/flights?origin=${origem}&destination=${destino}&departureDate=${data}`
      );
      const dados = await response.json();

      const voosFormatados = dados.data.map((item) => ({
        origem: item.itineraries[0].segments[0].departure.iataCode,
        destino: item.itineraries[0].segments.slice(-1)[0].arrival.iataCode,
        companhia: item.validatingAirlineCodes[0],
        preco: Number(item.price.total),
        moeda: item.price.currency,
      }));

      setVoos(voosFormatados);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
      setVoos([]);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔍 Buscador de Voos</h1>

      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Origem:</label>
          <select
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione</option>
            {cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Destino:</label>
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione</option>
            {cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Data de Ida:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          onClick={buscarVoos}
          disabled={!origem || !destino || !data}
          style={styles.button}
        >
          Buscar Voos
        </button>
      </div>

      <h2 style={styles.subTitle}>✈️ Resultados:</h2>
      {voos.length === 0 ? (
        <p style={styles.message}>Preencha os dados acima e clique em "Buscar Voos".</p>
      ) : (
        <div style={styles.results}>
          {voos.map((voo, i) => (
            <div key={i} style={styles.card}>
              <p><strong>{voo.origem} → {voo.destino}</strong></p>
              <p>Companhia: {voo.companhia}</p>
              <p>
                Preço:{' '}
                {voo.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
  },
  select: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginTop: 5,
  },
  input: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginTop: 5,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: 22,
    height: 40,
  },
  subTitle: {
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    color: '#777',
  },
  results: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};

export default App;
