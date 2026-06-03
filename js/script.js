// Función principal que se ejecuta al pulsar "Ejecutar Algoritmo"
function procesarClaves() {
    let inputCantidad = document.getElementById("cantidad");
    let selectFiltro = document.getElementById("filtro-seguridad");
    let divResultado = document.getElementById("resultado");
    let divErrores = document.getElementById("mensajes-error");
    
    let cantidad = parseInt(inputCantidad.value);
    let filtro = selectFiltro.value;

    // Limpiar errores previos
    divErrores.innerHTML = "";

    // Validación
    if (isNaN(cantidad) || cantidad <= 0) {
        divErrores.innerHTML = "<div class='alerta error'>❌ Error: Por favor, ingrese un número entero mayor a 0.</div>";
        divResultado.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">⚠️</span>
                <p>Esperando parámetros válidos para la ejecución.</p>
            </div>`;
        return;
    }

    if (cantidad > 75) {
        divErrores.innerHTML = "<div class='alerta advertencia'>⚠️ Advertencia: Para evitar sobrecarga en la memoria, la simulación se limitó a 75 términos.</div>";
        cantidad = 75;
    }

    let a = 0;
    let b = 1;
    let c;
    
    let clavesMostradas = 0;
    let clavesSegurasEncontradas = 0;

    let tablaHtml = `
        <table class="tabla-resultados">
            <thead>
                <tr>
                    <th>Iteración</th>
                    <th>Código Generado (Fibonacci)</th>
                    <th>Divisores</th>
                    <th>Estado Criptográfico</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 1; i <= cantidad; i++) {
        let contador = 0;
        
        if (a > 1) {
            for (let j = 1; j <= a; j++) {
                if (a % j === 0) {
                    contador++;
                }
            }
        }

        let esPrimo = (contador === 2);
        if (esPrimo) clavesSegurasEncontradas++;

        // Filtro
        if (filtro === "primos" && !esPrimo) {
            c = a + b;
            a = b;
            b = c;
            continue; 
        }

        clavesMostradas++;

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

        tablaHtml += `
            <tr class="${claseFila}">
                <td>${i}</td>
                <td class="codigo-destacado">${a}</td>
                <td>${contador}</td>
                <td>${estadoSeguridad}</td>
            </tr>
        `;

        c = a + b;
        a = b;
        b = c;
    }

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

    divResultado.innerHTML = tablaHtml;
    document.querySelector('.system-status').innerHTML = '<span class="status-indicator online"></span> Estado del Sistema: Simulación Completada';
}

// Función para reiniciar el panel
function limpiarPantalla() {
    document.getElementById("cantidad").value = "";
    document.getElementById("filtro-seguridad").value = "todos";
    document.getElementById("mensajes-error").innerHTML = "";
    document.getElementById("resultado").innerHTML = `
        <div class="empty-state">
            <span class="empty-icon">📊</span>
            <p>Consola vacía. Ingrese una cantidad de términos en el panel de control izquierdo y pulse "Ejecutar Algoritmo" para desplegar la matriz de claves.</p>
        </div>
    `;
    document.querySelector('.system-status').innerHTML = '<span class="status-indicator online"></span> Estado del Sistema: Listo para simulación';
}
