const form = document.getElementById("formLogin")

function validar(evento) {
    if (form.checkVisibility() === false) {
        form.classList.add('was-validated');
        evento.preventDefault();
        evento.stopPropagation();
    } else {
        form.classList.remove( 'was-validated' );
        return true;
    }
}

form.addEventListener( "submit", validar);