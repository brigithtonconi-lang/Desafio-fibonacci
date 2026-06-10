// js/script.js

/**
 * Genera la secuencia de Fibonacci hasta 'n' términos.
 * Se utiliza BigInt para soportar números masivos sin perder precisión.
 */
function generarFibonacci(n) {
    let fib = [];
    let a = 0n;
    let b = 1n;
    
    for (let i = 0; i < n; i++) {
        fib.push(a);
        let siguiente = a + b;
        a = b;
        b = siguiente;
    }
    
    return fib;
}

/**
 * Verifica si un número (BigInt) es primo mediante un algoritmo optimizado.
 */
function esPrimo(num) {
    // 0 y 1 no son primos
    if (num <= 1n) return false;
    // 2 y 3 sí son primos
    if (num <= 3n) return true;
    
    // Descartar múltiplos de 2 y 3 rápidamente
    if (num % 2n === 0n || num % 3n === 0n) return false;
    
    // Verificación 6k +/- 1 para eficiencia temporal
    for (let i = 5n; i * i <= num; i += 6n) {
        if (num % i === 0n || num % (i + 2n) === 0n) {
            return false;
        }
    }
    return true;
}

/**
 * Función principal enlazada al botón "Ejecutar Algoritmo"
 */
function procesarClaves() {
    const inputCantidad = document.getElementById('cantidad').value;
    const cantidad = parseInt(inputCantidad);
    const filtro = document.getElementById('filtro-seguridad').value;
    const resultadoDiv = document.getElementById('resultado');
    const errorDiv = document.getElementById('mensajes-error');

    // Limpiar alertas previas
    errorDiv.innerHTML = '';
    
    // Validar la entrada (entre 1 y 75 como pide el HTML)
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 75) {
        errorDiv.innerHTML = `
            <div class="alert-box error">
                <strong>Error de validación:</strong> Por favor, ingrese un número entero válido entre 1 y 75.
            </div>`;
        return;
    }

    // Calcular la matriz
    const matrizFibonacci = generarFibonacci(cantidad);
    
    // Construir la tabla de resultados HTML
    let tablaHTML = `
        <table class="tabla-resultados">
            <thead>
                <tr>
                    <th># de Iteración</th>
                    <th>Término Generado (Fibonacci)</th>
                    <th>¿Es Primo? (Clave Segura)</th>
                </tr>
            </thead>
            <tbody>
    `;

    let resultadosMostrados = 0;

    matrizFibonacci.forEach((numero, indice) => {
        let verificacionPrimo = esPrimo(numero);
        
        // Si el usuario eligió el filtro estricto y el número NO es primo, nos lo saltamos
        if (filtro === 'primos' && !verificacionPrimo) {
            return;
        }

        resultadosMostrados++;
        tablaHTML += `
            <tr>
                <td>${indice + 1}</td>
                <td style="word-break: break-all; font-family: monospace;">${numero.toString()}</td>
                <td>${verificacionPrimo ? '✅ Sí (Alta Seguridad)' : '❌ No'}</td>
            </tr>
        `;
    });

    tablaHTML += '</tbody></table>';

    // Mostrar estado si ningún número cumplió el filtro
    if (resultadosMostrados === 0) {
        resultadoDiv.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">⚠️</span>
                <p>No se encontraron Claves Primas en este rango numérico.</p>
            </div>`;
    } else {
        resultadoDiv.innerHTML = tablaHTML;
    }
}

/**
 * Función para restaurar la interfaz a su estado inicial
 */
function limpiarPantalla() {
    document.getElementById('cantidad').value = '';
    document.getElementById('filtro-seguridad').value = 'todos';
    document.getElementById('mensajes-error').innerHTML = '';
    
    document.getElementById('resultado').innerHTML = `
        <div class="empty-state">
            <span class="empty-icon">📊</span>
            <p>Consola vacía. Ingrese una cantidad de términos en el panel de control izquierdo y pulse "Ejecutar Algoritmo" para desplegar la matriz de claves.</p>
        </div>
    `;
}
