// Seleccionamos el botón de cálculo de nuestra interfaz HTML
let boton = document.getElementById("btnCalcular");

// Le indicamos al programa qué debe ejecutar al hacer clic
boton.onclick = function() {
    
    // 1. Capturamos el horizonte temporal (número de meses) ingresado
    let inputMeses = document.getElementById("meses").value;
    let cantidadMeses = parseInt(inputMeses);
    let areaResultado = document.getElementById("resultado");

    // Validación: verificamos que el dato ingresado sea un número mayor a 0
    if (isNaN(cantidadMeses) || cantidadMeses <= 0) {
        areaResultado.innerHTML = "<p style='color: #800020; font-weight: bold;'>Por favor, ingrese un horizonte temporal válido (mayor a 0).</p>";
        return; // Detenemos la ejecución si hay error
    }

    // 2. Variables para la serie de Fibonacci sin usar vectores
    let a = 0;
    let b = 1;
    let c;
    
    // Variables para nuestra proyección de acumulación de capital
    let ahorroTotal = 0;
    let desgloseHTML = "<ul>";

    // 3. Ciclo iterativo para proyectar los depósitos mes a mes
    for (let i = 1; i <= cantidadMeses; i++) {
        // Lógica de recurrencia (Fibonacci)
        c = a + b;
        a = b;
        b = c;
        
        // Sumamos el depósito de este mes al capital total
        ahorroTotal = ahorroTotal + a; 
        
        // Estructuramos el resultado visual para este periodo
        desgloseHTML = desgloseHTML + "<li>Mes " + i + ": Depósito de Bs. " + a + "</li>";
    }

    desgloseHTML = desgloseHTML + "</ul>";
    
    // Agregamos el balance final resaltado
    desgloseHTML = desgloseHTML + "<p style='margin-top: 15px; font-size: 1.1em; color: #800020;'><strong>Capital Total Acumulado: Bs. " + ahorroTotal + "</strong></p>";

    // 4. Imprimimos la proyección resultante directamente en la página web
    areaResultado.innerHTML = desgloseHTML;
};