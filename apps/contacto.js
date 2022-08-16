const enviarMail = document.getElementById('enviarMail')

const inputNombre = document.getElementById('exampleFormControlInput1')
const inputApellido = document.getElementById('exampleFormControlInput2')
const inputEmail = document.getElementById('exampleFormControlInput3')
const inputMensaje = document.getElementById('exampleFormControlTextarea1')


enviarMail.addEventListener('click', (e) => {

    e.preventDefault()

    if(inputNombre.value==="" || inputApellido.value==="" || inputEmail.value==="" || inputMensaje.value===""){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Complete los campos!`,
            showConfirmButton: false,
            timer: 1500
        })
        return false;
    }


    emailjs.init("Il4613JHqDWAHcbwU");

    var templateParams = {
        from_name: inputNombre.value + " " + inputApellido.value,
        to_name: inputEmail.value,
        message: inputMensaje.value,
        reply_to: "jguerra1968@gmail.com",
    };

    emailjs.send('service_ila3o2r', 'template_w2meonu', templateParams)
        .then(function (response) {
            // SWEET ALERT
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Has enviado el formulario de contacto`,
                showConfirmButton: false,
                timer: 1500
            })
            
        }, function (error) {
            console.log('FAILED...', error);
        });

    inputNombre.value="";
    inputApellido.value="";
    inputEmail.value="";
    inputMensaje.value="";

    // location.reload();

})