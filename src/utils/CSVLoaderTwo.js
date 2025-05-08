export async function loadCSV(path) {
  try {
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

    // Índices de las columnas 4, 5, 6 y 7 (0-based index → 3, 4, 5, 6)
    const selectedColumnIndices = [3, 4, 5, 6];
    const selectedHeaders = selectedColumnIndices.map(i => headers[i]);

    const data = lines.slice(1).map(line => {
      const cols = line.split(",").map(col => col.trim());
      const entry = {
        entity: cols[entityIdx],
        year: cols[yearIdx],
      };

      selectedColumnIndices.forEach((idx, i) => {
        const key = selectedHeaders[i];
        const value = parseFloat(cols[idx]);
        entry[key] = isNaN(value) ? 0 : value;
      });

      return entry;
    });

    // Agrupar por país y año
    const grouped = {};
    data.forEach(({ entity, year, ...values }) => {
      if (!grouped[entity]) grouped[entity] = {};
      if (!grouped[entity][year]) grouped[entity][year] = {};
      Object.assign(grouped[entity][year], values);
    });

    return grouped;

  } catch (error) {
    console.error("Error al procesar el CSV:", error);
    return {};
  }
}
