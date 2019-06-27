//Declaración de variables
var nombreUsuario = "Guido Lopez";
var saldoCuenta = 9700;
var limiteExtraccion = 3000;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones de suma y resta generales.
function sumarDinero(CantidadDeDinero) {
    saldoCuenta = saldoCuenta+CantidadDeDinero;
}

function restarDinero(CantidadDeDinero) {
    saldoCuenta = saldoCuenta-CantidadDeDinero;
}

/*Funciones de los botones.
Los prompts y alerts fueron cambiados por la librería de sweet alert con fines estéticos.
Dentro de cada función se encuentra el alert o prompt y sus propiedades y luego la función
propiamente dicha con las instrucciones a seguir. */

function cambiarLimiteDeExtraccion() {
    swal({
        title: "Extraer Dinero",
        text: "Ingresá un nuevo límite de extracción",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "$"
        },
        function(inputValue) {
            limiteExtraccion = parseInt(inputValue);
            if (isNaN(limiteExtraccion)) {
            swal("","Sólo podés ingresar números!","error");
            } else {
            swal("Hecho!","Tu nuevo límite de extracción es: $" + limiteExtraccion, "success");
            actualizarLimiteEnPantalla();
        }
    })    
}

function extraerDinero() {
    swal ({
        title: "Extraer Dinero",
        text: "Ingresa la cantidad de dinero a extraer",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "$"
        },
        function(inputValue) {
            var montoExtraido = parseInt(inputValue);
            var modulo = montoExtraido % 100;

            if (montoExtraido > saldoCuenta) {
                swal("","No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.","error");
            } else if (montoExtraido > limiteExtraccion) {
                swal("","El monto ingresado excede el limite de extracción. Ingresá un monto menor.","error");
            } else if (modulo) {
                swal("","Este cajero sólo entrega billetes de $100.","error");
            } else if (isNaN(montoExtraido)){
                swal("","Ingresá solamente números!","error");
            } else {
            var saldoAnterior = saldoCuenta;
            restarDinero(montoExtraido);
                swal("Hecho!","Tenías: $" + saldoAnterior +"\nRetiraste: $" + montoExtraido + "\nAhora tenés: $" + saldoCuenta, "success");
            actualizarSaldoEnPantalla();
        }
    })
}

function depositarDinero() {
    swal ({
        title: "Depositar Dinero",
        text: "Ingresa la cantidad de dinero a depositar",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "$"
        },
        function(inputValue) {
            var montoDepositado = parseInt(inputValue);
            var saldoAnterior = saldoCuenta;
            if (isNaN(montoDepositado)){
                swal("","Ingresá solamente números!","error");
            } else {
            var nuevoSaldo = saldoAnterior + montoDepositado;
                swal("Hecho!","Tenías: $" + saldoAnterior + "\nDepositaste: $" + montoDepositado + "\nAhora tenés: $" + nuevoSaldo, "success");
            }
        sumarDinero(montoDepositado);
        actualizarSaldoEnPantalla();
    })
}

function pagarServicio() {
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;
    swal ({
        title: "Pagar Servicios",
        text: "Ingresá el número del servicio que querés pagar: \n1. Agua ($350) \n2. Teléfono ($425) \n3. Luz ($210) \n4. Internet ($570)",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "$"
        },
        function(inputValue) {
            var pago = (inputValue);
            var nombreServicio;
            var precioServicio;

            switch (pago) {
            case "1":
                nombreServicio = 'Agua';
                precioServicio = agua;
            break;
            case "2":
                nombreServicio = 'Teléfono';
                precioServicio = telefono;
            break;
            case "3":
                nombreServicio = 'Luz';
                precioServicio = luz;
            break;
            case "4":
                nombreServicio = 'Internet';
                precioServicio = internet;
            break;
            default:
                    swal("", "El número ingresado no se corresponde con los servicios disponibles.", "error");
            }

            if (saldoCuenta < precioServicio) {
                swal("","No hay suficiente dinero en tu cuenta para pagar este servicio","error");
            } else {
                restarDinero(precioServicio);
                swal("Pago realizado!","Pagaste por el servicio de " + nombreServicio + ". " +
                     "\nSaldo anterior: $" + (saldoCuenta+precioServicio) +
                     "\nDinero descontado: $" + precioServicio +
                     "\nSaldo actual: $" + saldoCuenta, "success");
            }
        actualizarSaldoEnPantalla();
    })        
}

function transferirDinero() {
    var cuentaAmiga1 = "1234567";
    var cuentaAmiga2 = "7654321";
    swal ({
        title: "Transferir Dinero",
        text: "Ingresa la cantidad de dinero a transferir",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "$"
      },
      function(inputValue) {
        var dineroATransferir = parseInt(inputValue);
        if (dineroATransferir > saldoCuenta) {
            swal("", "No tenés dinero suficiente en tu cuenta para realizar esta transferencia.", "error");
        } else if (isNaN(dineroATransferir)){
            swal("","Ingresá solamente números!","error");
        }
            else {
            swal({
                title: "Transferir Dinero",
                text: "Ingresa el número de la cuenta de destino",
                type: "input",
                showCancelButton: false,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Nº"
              },
              function(inputValue){
                var cuentaDeDestino = inputValue;
                if (cuentaDeDestino == cuentaAmiga1 || cuentaDeDestino == cuentaAmiga2) {
                restarDinero(dineroATransferir);
                swal("Dinero transferido!", "\nCantidad de dinero transferido: $" + dineroATransferir + "\nCuenta de destino: " + cuentaDeDestino, "success");
                actualizarSaldoEnPantalla();
                } else {
                swal("","La cuenta ingresada no se encuentra guardada en esta cuenta.", "error");
                } 
            });
        }
    });
}

function cerrarSesion() {
    window.location.href = 'index.html';
}

//Funciones que actualizan el valor de las variables en el HTML.
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}