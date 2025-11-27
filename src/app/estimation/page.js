'use client';
import { useState } from 'react';
import Link from 'next/link';

// Constantes para los datos de capacidad instalada (en TWh)
const RENEWABLE_CAPACITIES = {
  solar: 843.0860600000001,    // TWh
  wind: 824.8740600000001,     // TWh
  hydro: 6.7646065,            // TWh
  geothermal: 14075            // TWh
};

// Función para convertir TWh a kWh
const convertTWhToKWh = (twh) => twh * 1000000000; // 1 TWh = 1,000,000,000 kWh

// Componente para el formulario de estimación
const EstimationForm = ({ onSubmit, loading }) => {
  const [consumption, setConsumption] = useState('');

  const handleConsumptionChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setConsumption(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(consumption);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="consumption" className="block text-sm font-medium mb-2">
          Consumo Eléctrico Total (kWh)
        </label>
        <input
          type="text"
          id="consumption"
          value={consumption}
          onChange={handleConsumptionChange}
          className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Ingrese su consumo eléctrico (ej: 1234.56)"
          required
          pattern="^\d*\.?\d{0,2}$"
          title="Ingrese un número con hasta 2 decimales"
        />
        <p className="text-sm text-gray-400 mt-1">
          Puede ingresar números decimales con hasta 2 decimales
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        disabled={loading}
      >
        {loading ? 'Calculando...' : 'Calcular Porcentaje'}
      </button>
    </form>
  );
};

// Componente para mostrar los resultados
const Results = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 p-6 bg-gray-700 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Resultados</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Porcentaje de Energía Renovable:</span>{' '}
          <span className="text-green-400">{result.percentage}%</span>
        </p>
        <p>
          <span className="font-medium">Capacidad Total Renovable:</span>{' '}
          {result.totalCapacity} TWh
        </p>
        <p>
          <span className="font-medium">Su Consumo:</span>{' '}
          {result.userConsumption} kWh
        </p>
        <div className="mt-4 pt-4 border-t border-gray-600">
          <h3 className="font-medium mb-2">Desglose por Fuente Renovable:</h3>
          <ul className="space-y-1">
            <li>Solar: {result.details.solar} TWh</li>
            <li>Eólica: {result.details.wind} TWh</li>
            <li>Hidroeléctrica: {result.details.hydro} TWh</li>
            <li>Geotérmica: {result.details.geothermal} TWh</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Componente para las notas informativas
const InfoNotes = () => (
  <div className="mt-8 text-sm text-gray-400">
    <h3 className="font-medium mb-2">Notas:</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Este cálculo es una estimación basada en datos de capacidad instalada.</li>
      <li>Los resultados pueden variar según la ubicación y condiciones específicas.</li>
      <li>Para una evaluación más precisa, consulte con un especialista en energía renovable.</li>
      <li>Las capacidades renovables están expresadas en TWh (Teravatios-hora).</li>
    </ul>
  </div>
);

// Componente principal de la página
export default function EstimationPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRenewablePercentage = (consumption) => {
    setLoading(true);

    // Convertir el consumo del usuario de kWh a TWh para el cálculo
    const userConsumptionKWh = parseFloat(consumption);
    const userConsumptionTWh = userConsumptionKWh / 1000000000; // Convertir kWh a TWh

    const totalCapacity = Object.values(RENEWABLE_CAPACITIES).reduce((a, b) => a + b, 0);
    
    const renewablePercentage = (totalCapacity / (totalCapacity + userConsumptionTWh)) * 100;

    setResult({
      percentage: renewablePercentage.toFixed(2),
      totalCapacity: totalCapacity.toFixed(2),
      userConsumption: userConsumptionKWh.toFixed(2),
      details: {
        solar: RENEWABLE_CAPACITIES.solar.toFixed(2),
        wind: RENEWABLE_CAPACITIES.wind.toFixed(2),
        hydro: RENEWABLE_CAPACITIES.hydro.toFixed(2),
        geothermal: RENEWABLE_CAPACITIES.geothermal.toFixed(2)
      }
    });
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0d1117] text-white font-sans leading-relaxed flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full flex justify-end p-4 space-x-4 z-50">
        <Link href="/" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Inicio
        </Link>
        <Link href="/information" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Gráficos
        </Link>
        <Link href="/contact" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Contacto
        </Link>
      </nav>

      <div className="flex-grow max-w-4xl mx-auto mt-20 p-8">
        <h1 className="text-3xl font-bold mb-8">Estimación de Energía Renovable</h1>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <EstimationForm onSubmit={calculateRenewablePercentage} loading={loading} />
          <Results result={result} />
          <InfoNotes />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <nav className="space-x-4 text-sm">
          <Link href="https://www.larepublica.co/energia-solar" className="hover:underline">Noticias</Link>
          <Link href="/contact" className="hover:underline">Contacto</Link>
        </nav>
        <p className="mt-2">&copy; {new Date().getFullYear()} Soltage. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
} 