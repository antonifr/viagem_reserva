import React from 'react';

const ResultadoVoos = ({ voos }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {voos.map((voo, index) => (
        <div key={index} className="border rounded-2xl p-4 shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">
            {voo.itineraries[0].segments[0].departure.iataCode} ✈️ {voo.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
          </h2>
          <p className="font-bold text-lg text-green-600">
            💰 R$ {(voo.price.total * 5.3).toFixed(2)} {/* Convertendo de USD para BRL */}
          </p>
          <p className="mb-2 text-sm text-gray-500">
            {voo.travelerPricings.length} passageiro(s)
          </p>

          {voo.itineraries.map((itinerary, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="font-medium mb-1">Trecho {idx + 1}</h3>
              {itinerary.segments.map((segment, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-2 mb-2">
                  <p className="text-sm">
                    🛫 <strong>{segment.departure.iataCode}</strong> - {new Date(segment.departure.at).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm">
                    🛬 <strong>{segment.arrival.iataCode}</strong> - {new Date(segment.arrival.at).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-500">
                    ✈️ Companhia: {segment.carrierCode} | Voo: {segment.number}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultadoVoos;
