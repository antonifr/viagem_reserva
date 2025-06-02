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

export default function PesquisaCidade() {
  const [texto, setTexto] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);

  const onChange = (e) => {
    const valor = e.target.value;
    setTexto(valor);

    if (valor.length > 1) {
      const filtro = cidades.filter(c =>
        c.nome.toLowerCase().includes(valor.toLowerCase()) ||
        c.codigo.toLowerCase().includes(valor.toLowerCase())
      );
      setSugestoes(filtro.slice(0, 10));
    } else {
      setSugestoes([]);
    }
  };

  const onSelect = (cidade) => {
    setTexto(`${cidade.codigo} - ${cidade.nome}`);
    setCidadeSelecionada(cidade);
    setSugestoes([]);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <label htmlFor="cidade">Pesquisar cidade ou código do aeroporto:</label>
      <input
        id="cidade"
        type="text"
        value={texto}
        onChange={onChange}
        autoComplete="off"
        placeholder="Ex: GRU, São Paulo, Recife..."
        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
      />
      {sugestoes.length > 0 && (
        <ul style={{
          border: '1px solid #ccc',
          borderTop: 'none',
          maxHeight: 150,
          overflowY: 'auto',
          margin: 0,
          padding: 0,
          listStyle: 'none'
        }}>
          {sugestoes.map(cidade => (
            <li
              key={cidade.codigo}
              onClick={() => onSelect(cidade)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                borderBottom: '1px solid #eee'
              }}
              onMouseDown={e => e.preventDefault()} // para evitar blur antes do click
            >
              <strong>{cidade.codigo}</strong> — {cidade.nome}
            </li>
          ))}
        </ul>
      )}

      {cidadeSelecionada && (
        <div style={{ marginTop: 16 }}>
          <strong>Selecionado:</strong> {cidadeSelecionada.codigo} — {cidadeSelecionada.nome}
        </div>
      )}
    </div>
  );
}
