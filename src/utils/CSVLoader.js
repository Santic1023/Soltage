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