import {
    verificoStorage
} from "./app.js";
import {
    carritoVaciar
} from "./carritoIndex.js";

// IDENTIFICO EN QUE PAGINA ESTOY
const myURLsplitted = location.href.split("/")
const myPage = myURLsplitted.pop();

const vaciarCarrito = document.getElementById('vaciar')
const cerrarCarrito = document.getElementById('cerrar')
const finalizarCarrito = document.getElementById('finalizar')
const enviarCarrito = document.getElementById('enviar')
const abrirCarrito = document.getElementById('open')

// Formulario modal para el envio del pedido
const myModalUno = document.getElementById('modal-Carrito')

const myModalDos = document.getElementById('modalFinalizar')
const myInputCustomerName = document.getElementById('customer-name')
const myInputRecipientName = document.getElementById('recipient-name')
const myInputCustomerAddress = document.getElementById('customer-address')
const myInputCustomerCity = document.getElementById('customer-city')
const myInputCustomerPhone = document.getElementById('customer-phone')

// Posiciono el cursor en el campo nombre
myModalDos.addEventListener('shown.bs.modal', () => {
    myInputCustomerName.focus()
})

abrirCarrito.addEventListener('click', () => {
    // let contenedor = document.getElementById("modalFinal");
    let productos = JSON.parse(localStorage.getItem("carritoFG"));
    let cantidad;

    // uso de OPERADORES AVANZADOS TERNARIOS y VERIFICO CANTIDAD DE ITEMS>0
    productos ? cantidad = productos.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0) : 0;

    if (productos && cantidad > 0) {

        // PONGO EL BOTON COMO PRIMARIO y ENABLED
        finalizarCarrito.classList.remove('btn-secondary')
        finalizarCarrito.classList.add('btn-primary')
        finalizarCarrito.removeAttribute("disabled")

        vaciarCarrito.classList.remove('btn-secondary')
        vaciarCarrito.classList.add('btn-primary')
        vaciarCarrito.removeAttribute("disabled")

    } else {
        
        // PONGO EL BOTON COMO SECUNDARIO y DISABLED
        finalizarCarrito.classList.remove('btn-primary')
        finalizarCarrito.classList.add('btn-secondary')
        finalizarCarrito.setAttribute("disabled", "")

        vaciarCarrito.classList.remove('btn-primary')
        vaciarCarrito.classList.add('btn-secondary')
        vaciarCarrito.setAttribute("disabled", "")
    }

})

// VACIAR TODO EL CARRITO
vaciarCarrito.addEventListener('click', () => {

    // SWEET ALERT
    Swal.fire({
        title: '¿Estas seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

            // borra el storage
            localStorage.clear();
            // borra el array de pedidos
            carritoVaciar();
            // acomoda contadores del carrito header
            verificoStorage();
        
            // limpia modal del pedido
            const contenedorCarrito = document.getElementById("carrito-contenedor")
        
            if (contenedorCarrito) {
                contenedorCarrito.innerHTML = "";
            }
        
            let totalPedido = document.getElementById("elTotal");
            let precioPedido = 0;
            totalPedido.innerHTML = `Total: $${precioPedido}`;
 
            Swal.fire(
                'Carrito Eliminado!',
                'Carrito vacio!',
                'success'
            )
        }
    })



})

// muestro el pedido antes de mandarlo
finalizarCarrito.addEventListener('click', () => {
    muestraUltimoModal()
})

function muestraUltimoModal() {
    let contenedor = document.getElementById("modalFinal");
    let productos = JSON.parse(localStorage.getItem("carritoFG"));
    let cantidad;

    // uso de OPERADORES AVANZADOS TERNARIOS y VERIFICO CANTIDAD DE ITEMS>0
    productos ? cantidad = productos.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0) : 0;

    if (productos && cantidad > 0) {

        // PONGO EL BOTON COMO PRIMARIO y ENABLED
        enviarCarrito.classList.remove('btn-secondary')
        enviarCarrito.classList.add('btn-primary')
        enviarCarrito.removeAttribute("disabled")

        contenedor.innerHTML = "<h2>Confirmación de pedido</h2><br>";
        productos.forEach(element => {

            if (element.cantidad > 0) {
                let item = document.createElement("div");
                item.innerHTML = `cantidad: ${element.cantidad}
                                ${element.nombre}
                                - precio unit: $${element.precio}`;
                contenedor.append(item);
            }
        });

        const precioPedido = productos.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)

        let item = document.createElement("div");
        item.innerHTML = `<br><h3> TOTAL: $${precioPedido}</h3>`
        contenedor.append(item);

    } else {

        contenedor.innerHTML = "<h2>No hay ningún pedido!</h2><br>";

        // PONGO EL BOTON COMO SECUNDARIO y DISABLED
        enviarCarrito.classList.remove('btn-primary')
        enviarCarrito.classList.add('btn-secondary')
        enviarCarrito.setAttribute("disabled", "")
    }

}


// ENVIO pedido y vacio local storage
enviar.addEventListener('click', (e) => {

    // ACA hay que verificar los datos si estan completos
    if (myInputCustomerName.value === "" || myInputRecipientName.value === "" || myInputCustomerAddress.value === "" || myInputCustomerCity.value === "" || myInputCustomerPhone.value === "") {
        return false;
    }

    // previene el evento del boton SUBMIT
    e.preventDefault()

    // borra el storage
    localStorage.clear();
    // borra el array de pedidos
    carritoVaciar();
    // acomoda contadores del carrito header
    verificoStorage();

    // limpia modal del pedido
    const contenedorCarrito = document.getElementById("carrito-contenedor")

    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = "";
    }

    let totalPedido = document.getElementById("elTotal");
    let precioPedido = 0;
    totalPedido.innerHTML = `Total: $${precioPedido}`;

    // LUXON
    let DateTime = luxon.DateTime;
    let dt = DateTime.now();
    let fechaEntrega = dt.plus({
        days: 2
    }).toLocaleString()

    // cierro manualmente el MODAL ya que utilice el preventDefault mas arriba
    var modalDos = bootstrap.Modal.getInstance(myModalDos)
    modalDos.hide();

    myInputCustomerName.value = "";
    myInputRecipientName.value = "";
    myInputCustomerAddress.value = "";
    myInputCustomerCity.value = "";
    myInputCustomerPhone.value = "";

    // SWEET ALERT
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Pedido enviado exitosamente!',
        text: `El envio llegara el ${fechaEntrega}`,
        showConfirmButton: false,
        timer: 10000
    })


})