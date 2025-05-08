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

  // Cargar y agrupar datos
  useEffect(() => {
    const fetchData = async () => {
      const grouped = await loadCSV(
        "/08 wind-generation.csv",
        "/05 hydropower-consumption.csv",
        "/12 solar-energy-consumption.csv",
        "/16 biofuel-production.csv",
        "/17 installed-geothermal-capacity.csv"
      );

      const countries = Object.keys(grouped).sort();
      const defaultCountry = grouped["World"] ? "World" : countries[0];
      const defaultYears = Object.keys(grouped[defaultCountry] || {}).sort();
      const defaultYear = defaultYears.includes("2020") ? "2020" : "Todos";

      setDataByCountry(grouped);
      setSelectedCountry(defaultCountry);
      setSelectedYear(defaultYear);
      setAvailableYears(["Todos", ...defaultYears]);
    };
    fetchData();
  }, []);

  // Actualizar opciones de año cuando cambia el país
  useEffect(() => {
    if (selectedCountry && dataByCountry[selectedCountry]) {
      const years = Object.keys(dataByCountry[selectedCountry]).sort();
      setAvailableYears(["Todos", ...years]);

      if (!years.includes(selectedYear)) {
        setSelectedYear("Todos");
      }
    }
  }, [selectedCountry, dataByCountry]);

  // Renderizar gráfico
  useEffect(() => {
    if (!selectedCountry || !dataByCountry[selectedCountry]) return;

    let dataToShow;
    if (selectedYear === "Todos") {
      dataToShow = Object.entries(dataByCountry[selectedCountry]).map(([year, values]) => ({
        year,
        ...values
      }));
    } else {
      dataToShow = [{
        year: selectedYear,
        ...dataByCountry[selectedCountry][selectedYear]
      }];
    }

    const energyTypes = ["Wind", "Solar", "Hydro", "Biofuel", "Geothermal"];
    const series = energyTypes.map(type => ({
      name: type,
      type: 'bar',
      data: dataToShow.map(d => d[type] || 0),
      emphasis: {
        focus: 'series'
      }
    }));

    const years = dataToShow.map(d => d.year);

    if (chartInstance) chartInstance.dispose();

    const chart = echarts.init(chartRef.current);
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: energyTypes,
        textStyle: {
          color: '#ffffff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: years,
        axisLabel: { color: "#ffffff" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ffffff" },
      },
      series,
      backgroundColor: "transparent",
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

      <div
        ref={chartRef}
        className="w-full h-96 rounded-xl bg-gray-900 shadow-inner"
      />
    </div>
  );
}
