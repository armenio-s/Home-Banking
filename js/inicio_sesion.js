//Funciones para inicio de sesión y validación del formulario

window.onload = function() {
    ocultarNotificacion();
}

function ocultarNotificacion() {
    document.getElementById('notificacion').style.display = 'none';
}

function mostrarNotificacion() {
    document.getElementById('notificacion').style.display = 'block';
}

function redirigir() {
    document.getElementById("ingreso").submit;
    window.location.href = 'mi-cuenta.html';
}

function validarDatos() {
    var nombreDeUsuario = "banconacional";
    var password = 123456789;
    var passwordIngresada = document.getElementById("password").value;
    var usuarioIngresado = document.getElementById("usuario").value;

    if (usuarioIngresado == nombreDeUsuario && passwordIngresada == password) {
        redirigir();
    } else {
        mostrarNotificacion();
    }
}

function recuperarPassword() {
    var email = "banconacional@gmail.com";

    swal({
        title: "Recuperar Contraseña",
        text: "Ingresá tu mail y te enviaremos los pasos a seguir",
        type: "input",
        showCancelButton: false,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Email",
        },
        function(inputValue) {
        if (email == inputValue) {
            swal("Email enviado","Revisá tu casilla de email para cambiar tu contraseña", "success");
        } else {
            swal("","Este email no se encuentra registrado en nuestra base de datos","error");
        }
    })    
}