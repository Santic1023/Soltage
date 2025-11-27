export async function loadCSV(...paths) {
  try {
    // Cargar todos los archivos en paralelo
    const allData = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        }
        const text = await response.text();
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map(h => h.trim());
        
        const entityIdx = headers.indexOf("Entity");
        const yearIdx = headers.indexOf("Year");
        if (entityIdx === -1 || yearIdx === -1) {
          throw new Error("Las columnas 'Entity' o 'Year' no se encuentran en el archivo.");
        }

        // Determinar el tipo de energía basado en el nombre del archivo
        let energyType = "Unknown";
        if (path.includes("wind")) energyType = "Wind";
        else if (path.includes("solar")) energyType = "Solar";
        else if (path.includes("hydro")) energyType = "Hydro";
        else if (path.includes("biofuel")) energyType = "Biofuel";
        else if (path.includes("geothermal")) energyType = "Geothermal";

        // Buscar la columna de valores
        const valueIdx = headers.findIndex(h => 
          h.toLowerCase().includes("electricity") || 
          h.toLowerCase().includes("generation") ||
          h.toLowerCase().includes("consumption") ||
          h.toLowerCase().includes("capacity")
        );

        return lines.slice(1).map(line => {
          const cols = line.split(",").map(col => col.trim());
          return {
            entity: cols[entityIdx],
            year: cols[yearIdx],
            value: parseFloat(cols[valueIdx]) || 0,
            type: energyType
          };
        });
      })
    );

    // Combinar todos los datos en un solo array
    const combinedData = allData.flat();

    // Agrupar los datos por entidad (país) y año
    const grouped = {};
    combinedData.forEach(({ entity, year, value, type }) => {
      if (!grouped[entity]) grouped[entity] = {};
      if (!grouped[entity][year]) grouped[entity][year] = {};
      grouped[entity][year][type] = value;
    });

    return grouped;

  } catch (error) {
    console.error("Error al procesar los CSV:", error);
    return {};
  }
}

export async function loadCSVData(filePath) {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    // Obtener el último año disponible (última línea con datos)
    const lastLine = lines[lines.length - 2].split(','); // -2 porque la última línea suele estar vacía
    
    // Crear objeto con los datos del último año
    const lastYearData = {};
    headers.forEach((header, index) => {
      if (index > 0) { // Saltar la primera columna (año)
        lastYearData[header] = parseFloat(lastLine[index]) || 0;
      }
    });

    return {
      headers: headers.slice(1), // Excluir la columna de año
      lastYearData
    };
  } catch (error) {
    console.error(`Error cargando el archivo CSV ${filePath}:`, error);
    return {
      headers: [],
      lastYearData: {}
    };
  }
}

export async function loadAllCSVData() {
  const files = [
    '/media/17-installed-geothermal-capacity.csv',
    '/media/13-installed-solar-PV-capacity.csv',
    '/media/09-cumulative-installed-wind-energy-capacity-gigawatts.csv',
    '/media/06-hydro-share-energy.csv'
  ];

  try {
    const [geothermal, solar, wind, hydro] = await Promise.all(
      files.map(file => loadCSVData(file))
    );

    // Obtener países comunes en todos los archivos
    const commonCountries = geothermal.headers.filter(country =>
      solar.headers.includes(country) &&
      wind.headers.includes(country) &&
      hydro.headers.includes(country)
    );

    return {
      countries: commonCountries,
      data: {
        geothermal,
        solar,
        wind,
        hydro
      }
    };
  } catch (error) {
    console.error('Error cargando los datos CSV:', error);
    return {
      countries: [],
      data: {
        geothermal: { headers: [], lastYearData: {} },
        solar: { headers: [], lastYearData: {} },
        wind: { headers: [], lastYearData: {} },
        hydro: { headers: [], lastYearData: {} }
      }
    };
  }
}