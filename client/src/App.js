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
    <div style={{ padding: 20 }}>
      <h1>Busca de Voos</h1>

      <div>
        <label>
          Origem:
          <select value={origem} onChange={(e) => setOrigem(e.target.value)}>
            <option value="">Selecione</option>
            {cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Destino:
          <select value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Selecione</option>
            {cidades.map((cidade) => (
              <option key={cidade.codigo} value={cidade.codigo}>
                {cidade.nome} ({cidade.codigo})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Data de Ida:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>
      </div>

      <button onClick={buscarVoos} disabled={!origem || !destino || !data}>
        Buscar Voos
      </button>

      <h2>Resultados:</h2>
      {voos.length === 0 ? (
        <p>Digite os dados e clique em "Buscar Voos".</p>
      ) : (
        <ul>
          {voos.map((voo, i) => (
            <li key={i}>
              {voo.origem} → {voo.destino} | Companhia: {voo.companhia} | Preço:{' '}
              {voo.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
