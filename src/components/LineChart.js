import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { loadCSV } from "../utils/CSVLoader";

export default function CSVCharts() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataByCountry, setDataByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("World");

  useEffect(() => {
    const fetchData = async () => {
      const grouped = await loadCSV(
        "/09 cumulative-installed-wind-energy-capacity-gigawatts.csv",
        "/13 installed-solar-PV-capacity.csv",
        "/17 installed-geothermal-capacity.csv"
      );

      const countries = Object.keys(grouped).sort();
      const hasWorld = grouped.hasOwnProperty("World");
      const defaultCountry = hasWorld ? "World" : countries[0];

      setDataByCountry(grouped);
      setSelectedCountry(defaultCountry);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCountry || !dataByCountry[selectedCountry]) return;

    const countryData = dataByCountry[selectedCountry];
    const dataToShow = Object.entries(countryData).map(([year, values]) => ({
      year,
      ...values
    }));

    const energyTypes = [
      { key: "Wind", label: "Eólica" },
      { key: "Solar", label: "Solar fotovoltaica" },
      { key: "Geothermal", label: "Geotérmica" }
    ];
    const years = dataToShow.map((d) => d.year);

    const series = energyTypes.map(({ key, label }) => ({
      name: label,
      type: "line",
      smooth: true,
      data: dataToShow.map((d) => d[key] || 0)
    }));

    if (chartInstance) chartInstance.dispose();

    const chart = echarts.init(chartRef.current);
    chart.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: energyTypes.map((t) => t.label),
        textStyle: { color: "#ffffff" }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: years,
        axisLabel: { color: "#ffffff" }
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ffffff" }
      },
      series,
      backgroundColor: "transparent"
    });

    setChartInstance(chart);
    return () => chart.dispose();
  }, [selectedCountry, dataByCountry]);

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
            className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            {Object.keys(dataByCountry).sort().map((country) => (
              <option key={country} value={country}>
                {country}
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
