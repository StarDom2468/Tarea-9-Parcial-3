// Función para convertir el SQL a JSON (ya la proporcionamos previamente)
function parseSQLToJSON(sql) {
    const jsonResult = {}; // Objeto para almacenar el resultado
    
    // Dividir el SQL en declaraciones individuales (por ejemplo, INSERT INTO)
    const statements = sql.split(/;\s*/).map(statement => statement.trim()).filter(Boolean);
    
    let counter = 1; // Contador para las filas
  
    // Iterar sobre cada declaración SQL
    statements.forEach(statement => {
      // Buscar las declaraciones INSERT INTO usando una expresión regular mejorada
      const insertMatch = statement.match(/INSERT INTO\s+`?(\w+)`?\s*\((.*?)\)\s+VALUES\s*\((.*?)\)/is);
  
      if (insertMatch) {
        const tableName = insertMatch[1]; // Nombre de la tabla
        const columnas = insertMatch[2].split(",").map(col => col.trim()); // Nombres de columnas
        const valuesString = insertMatch[3]; // Valores de las filas
  
        // Separar las filas de valores
        const values = valuesString.split(/\),\s*\(/).map(valSet => 
          valSet.split(",").map(val => {
            // Eliminar comillas de los valores de texto y convertir valores numéricos
            if (val.match(/^\d+(\.\d+)?$/)) {
              return parseFloat(val); // Convertir a número (precio, pesoKg, etc.)
            } else {
              return val.trim().replace(/['"]/g, ""); // Limpiar comillas y devolver texto
            }
          })
        );
  
        // Si la tabla aún no está en el resultado, crearla
        if (!jsonResult[tableName]) {
          jsonResult[tableName] = [];
        }
  
        // Iterar sobre cada fila de valores
        values.forEach((row) => {
          const rowObject = {};
  
          // Asignar valores a las columnas correspondientes
          columnas.forEach((col, colIndex) => {
            rowObject[col] = row[colIndex]; // Asignar el valor correspondiente a la columna
          });
  
          // Agregar la fila al array de la tabla
          jsonResult[tableName].push(rowObject);
        });
      }
    });
  
    return jsonResult; // Devolver el resultado como JSON
  }
  
  // Función para manejar la carga del archivo y convertirlo a JSON
  function convertSQLToJSON() {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');
    
    // Verificar si se seleccionó un archivo
    if (fileInput.files.length === 0) {
      output.textContent = "Por favor, selecciona un archivo SQL.";
      return;
    }
  
    const file = fileInput.files[0];
  
    // Crear un objeto FileReader para leer el archivo
    const reader = new FileReader();
    
    // Función que se ejecuta cuando el archivo se lee correctamente
    reader.onload = function(event) {
      const sqlContent = event.target.result;
      
      // Convertir el SQL a JSON
      const json = parseSQLToJSON(sqlContent);
  
      // Mostrar el resultado JSON en el área 'output'
      output.textContent = JSON.stringify(json, null, 2); // Formatear el JSON para mayor legibilidad
    };
  
    // Función que se ejecuta si ocurre un error al leer el archivo
    reader.onerror = function(event) {
      output.textContent = "Hubo un error al leer el archivo.";
    };
  
    // Leer el archivo como texto
    reader.readAsText(file);
  }
  