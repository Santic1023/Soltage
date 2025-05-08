import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { loadCSV } from "../utils/CSVLoader";

export default function CSVCharts() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataByCountry, setDataByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [availableYears, setAvailableYears] = useState([]);

  const labelMap = {
    Wind: "Eólica",
    Solar: "Solar",
    Hydro: "Hídrica",
    Renewables: "Renovables"
  };

  const energyTypes = Object.keys(labelMap);

  // Cargar y agrupar datos
  useEffect(() => {
    const fetchData = async () => {
      const grouped = await loadCSV(
        "04 share-electricity-renewables.csv",
        "11 share-electricity-wind.csv",
        "15 share-electricity-solar.csv",
        "07 share-electricity-hydro.csv"
      );

      setDataByCountry(grouped);

      // Establecer valores por defecto
      const defaultCountry = grouped["World"] ? "World" : Object.keys(grouped).sort()[0];
      const defaultYear = grouped[defaultCountry] && grouped[defaultCountry]["2021"] ? "2021" : "Todos";

      setSelectedCountry(defaultCountry);
      setSelectedYear(defaultYear);

      const years = Object.keys(grouped[defaultCountry] || {}).sort();
      setAvailableYears(["Todos", ...years]);
    };

    fetchData();
  }, []);

  // Actualizar opciones de año si cambia el país
  useEffect(() => {
    if (selectedCountry && dataByCountry[selectedCountry]) {
      const years = Object.keys(dataByCountry[selectedCountry]).sort();
      setAvailableYears(["Todos", ...years]);

      if (!years.includes(selectedYear)) {
        setSelectedYear("Todos");
      }
    }
  }, [selectedCountry, dataByCountry]);

  // Renderizar gráfico de torta
  useEffect(() => {
    if (!selectedCountry || selectedYear === "Todos") return;

    const countryData = dataByCountry[selectedCountry];
    if (!countryData || !countryData[selectedYear]) return;

    const values = countryData[selectedYear];

    const pieData = energyTypes.map(type => ({
      name: labelMap[type],
      value: values[type] || 0
    }));

    if (!chartRef.current) return;

    if (chartInstance) {
      chartInstance.dispose();
    }

    const chart = echarts.init(chartRef.current);
    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: { color: "#ffffff" }
      },
      series: [
        {
          name: "Producción",
          type: "pie",
          radius: "50%",
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      backgroundColor: "transparent"
    });

    setChartInstance(chart);
    return () => chart.dispose();
  }, [selectedCountry, selectedYear, dataByCountry]);

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Selector de País */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            País
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none"
          >
            {Object.keys(dataByCountry).sort().map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Año */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Año
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedYear === "Todos" ? (
        <p className="text-white text-center mt-10">
          Selecciona un año específico para ver el gráfico de torta.
        </p>
      ) : (
        <div
          ref={chartRef}
          className="w-full h-96 rounded-xl bg-gray-900 shadow-inner"
        />
      )}
    </div>
  );
}
