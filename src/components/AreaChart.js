import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { loadCSV } from "../utils/CSVLoaderTwo";

export default function CSVCharts() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataByCountry, setDataByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("World");
  const [categoryKeys, setCategoryKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const grouped = await loadCSV("/02 modern-renewable-energy-consumption.csv");

      const countries = Object.keys(grouped).sort();
      const hasWorld = grouped.hasOwnProperty("World");
      const defaultCountry = hasWorld ? "World" : countries[0];

      const firstYear = Object.keys(grouped[defaultCountry])[0];
      const exampleEntry = grouped[defaultCountry][firstYear];

      // Nombres de las columnas que se quieren mostrar (deben coincidir con los nombres en el CSV)
      const keys = [
        "Geo Biomass Other - TWh",
        "Solar Generation - TWh",
        "Wind Generation - TWh"
      ];

      setCategoryKeys(keys);
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

    const years = dataToShow.map((d) => d.year);

    const series = categoryKeys.map((key) => ({
      name: key,
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: { focus: "series" },
      data: dataToShow.map((d) => {
        const val = parseFloat(d[key]);
        return isNaN(val) ? null : val;
      })
    }));

    if (chartInstance) chartInstance.dispose();

    const chart = echarts.init(chartRef.current);
    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: categoryKeys,
        textStyle: { color: "#ffffff" }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
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
  }, [selectedCountry, dataByCountry, categoryKeys]);

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <div className="flex flex-wrap gap-4 mb-6">
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