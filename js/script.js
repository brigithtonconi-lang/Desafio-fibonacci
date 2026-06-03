// Función principal que se ejecuta al pulsar "Ejecutar Algoritmo"
function procesarClaves() {
    // Uso exclusivo de getElementById según los requerimientos
    let inputCantidad = document.getElementById("cantidad");
    let selectFiltro = document.getElementById("filtro-seguridad");
    let divResultado = document.getElementById("resultado");
    let divErrores = document.getElementById("mensajes-error");
    
    let cantidad = parseInt(inputCantidad.value);
    let filtro = selectFiltro.value; // Puede ser "todos" o "primos"

    // Limpiar errores previos
    divErrores.innerHTML = "";

    // Validación de entrada
    if (isNaN(cantidad) || cantidad <= 0) {
        divErrores.innerHTML = "<div class='alerta error'>❌ Error: Por favor, ingrese un número entero mayor a 0.</div>";
        divResultado.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">⚠️</span>
                <p>Esperando parámetros válidos para la ejecución.</p>
            </div>`;
        return;
    }

    // Límite de seguridad para evitar desbordamiento del navegador
    if (cantidad > 75) {
        divErrores.innerHTML = "<div class='alerta advertencia'>⚠️ Advertencia: Para evitar sobrecarga en la memoria, la simulación se ajustó a 75 términos máximos.</div>";
        cantidad = 75;
    }

    // Variables de control de Fibonacci (Cumpliendo la regla de NO usar arrays)
    let a = 0;
    let b = 1;
    let c;
    
    // Contadores para el resumen final
    let clavesMostradas = 0;
    let clavesSegurasEncontradas = 0;

    // Encabezado de la tabla dinámica
    let tablaHtml = `
        <table class="tabla-resultados">
            <thead>
                <tr>
                    <th>Iteración</th>
                    <th>Código Generado (Fibonacci)</th>
                    <th>Divisores (1 a N)</th>
                    <th>Estado Criptográfico</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Bucle principal de ejecución
    for (let i = 1; i <= cantidad; i++) {
        
        // --- 1. EVALUACIÓN DE PRIMICIDAD ---
        let contador = 0;
        
        // Los números 0 y 1 no son primos matemáticamente
        if (a > 1) {
            for (let j = 1; j <= a; j++) {
                if (a % j === 0) {
                    contador++;
                }
            }
        }

        let esPrimo = (contador === 2);
        if (esPrimo) clavesSegurasEncontradas++;

        // --- 2. LÓGICA DE FILTRADO ---
        // Si el usuario eligió ver solo primos y el número actual no lo es, calculamos el siguiente y saltamos.
        if (filtro === "primos" && !esPrimo) {
            c = a + b;
            a = b;
            b = c;
            continue; 
        }

        clavesMostradas++;

        // --- 3. RENDERIZADO VISUAL ---
        let estadoSeguridad = "";
        let claseFila = "";

        if (esPrimo) {
            estadoSeguridad = "<span class='badge seguro'>✅ CLAVE SEGURA</span>";
            claseFila = "fila-segura";
        } else if (a === 0 || a === 1) {
            estadoSeguridad = "<span class='badge neutro'>N/A</span>";
            contador = "N/A";
        } else {
            estadoSeguridad = "<span class='badge inseguro'>❌ VULNERABLE</span>";
            claseFila = "fila-insegura";
        }

        // Agregar la fila calculada
        tablaHtml += `
            <tr class="${claseFila}">
                <td>${i}</td>
                <td class="codigo-destacado">${a}</td>
                <td>${contador}</td>
                <td>${estadoSeguridad}</td>
            </tr>
        `;

        // --- 4. AVANCE DE FIBONACCI ---
        c = a + b;
        a = b;
        b = c;
    }

    // Mensaje si el filtro oculta todos los resultados
    if (clavesMostradas === 0) {
        tablaHtml += `<tr><td colspan="4" class="placeholder-text">No se encontraron claves seguras (primos) en este rango. Intente aumentar la cantidad de términos.</td></tr>`;
    }

    tablaHtml += `
            </tbody>
        </table>
        <div class="resumen">
            <p>Se evaluaron <strong>${cantidad}</strong> iteraciones. Se encontraron <strong>${clavesSegurasEncontradas}</strong> claves seguras en total.</p>
        </div>
    `;

    // Inyectar el HTML en la página
    divResultado.innerHTML = tablaHtml;

    // Cambiar estado del sistema visualmente
    document.querySelector('.system-status').innerHTML = '<span class="status-indicator online"></span> Estado del Sistema: Simulación Completada';
}

// Función para reiniciar el entorno interactivo
function limpiarPantalla() {
    document.getElementById("cantidad").value = "";
    document.getElementById("filtro-seguridad").value = "todos";
    document.getElementById("mensajes-error").innerHTML = "";
    document.getElementById("resultado").innerHTML
