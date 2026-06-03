// Función principal que se ejecuta al hacer clic en el botón
function procesarClaves() {
    // Uso obligatorio y exclusivo de getElementById
    let inputCantidad = document.getElementById("cantidad");
    let divResultado = document.getElementById("resultado");
    let divErrores = document.getElementById("mensajes-error");
    
    let cantidad = parseInt(inputCantidad.value);

    // Limpiar errores previos
    divErrores.innerHTML = "";

    // Validación de datos de entrada
    if (isNaN(cantidad) || cantidad <= 0) {
        divErrores.innerHTML = "<div class='alerta error'>Error: Por favor, ingrese un número entero mayor a 0.</div>";
        divResultado.innerHTML = "<p class='placeholder-text'>Esperando datos válidos...</p>";
        return;
    }

    if (cantidad > 100) {
        divErrores.innerHTML = "<div class='alerta advertencia'>Advertencia: Se limitó a 100 para evitar sobrecarga del navegador.</div>";
        cantidad = 100;
    }

    // Variables simples para Fibonacci (Sin usar vectores)
    let a = 0;
    let b = 1;
    let c;

    // Construcción de la tabla de resultados
    let tablaHtml = `
        <table class="tabla-resultados">
            <thead>
                <tr>
                    <th>Nivel</th>
                    <th>Código Generado (Fibonacci)</th>
                    <th>Divisores Encontrados</th>
                    <th>Estado de Seguridad (Primo)</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Ciclo para procesar la cantidad solicitada
    for (let i = 1; i <= cantidad; i++) {
        
        // --- INICIO ALGORITMO DE NÚMEROS PRIMOS ---
        let contador = 0;
        
        // El 0 y el 1 no son primos por definición matemática, empezamos desde números mayores a 1
        if (a > 1) {
            for (let j = 1; j <= a; j++) {
                if (a % j === 0) {
                    contador++;
                }
            }
        }

        // --- EVALUACIÓN Y RENDERIZADO ---
        let estadoSeguridad = "";
        let claseFila = "";

        if (contador === 2) {
            estadoSeguridad = "<span class='badge seguro'>CLAVE SEGURA (Es Primo)</span>";
            claseFila = "fila-segura";
        } else {
            estadoSeguridad = "<span class='badge inseguro'>VULNERABLE (No Primo)</span>";
            claseFila = "fila-insegura";
        }

        // Casos especiales para 0 y 1
        if (a === 0 || a === 1) {
            estadoSeguridad = "<span class='badge neutro'>NO APLICABLE</span>";
            contador = "N/A";
            claseFila = "";
        }

        // Agregar fila a la tabla
        tablaHtml += `
            <tr class="${claseFila}">
                <td>${i}</td>
                <td class="codigo-destacado">${a}</td>
                <td>${contador}</td>
                <td>${estadoSeguridad}</td>
            </tr>
        `;

        // --- AVANCE DEL ALGORITMO DE FIBONACCI ---
        c = a + b;
        a = b;
        b = c;
    }

    tablaHtml += `
            </tbody>
        </table>
        <div class="resumen">
            <p>Se han procesado <strong>${cantidad}</strong> secuencias correctamente.</p>
        </div>
    `;

    // Mostrar los resultados en la página
    divResultado.innerHTML = tablaHtml;
}

// Función adicional para limpiar el formulario y los resultados
function limpiarPantalla() {
    document.getElementById("cantidad").value = "";
    document.getElementById("mensajes-error").innerHTML = "";
    document.getElementById("resultado").innerHTML = "<p class='placeholder-text'>Los códigos generados y su análisis de seguridad aparecerán aquí...</p>";
}
