import {
    verificoStorage
} from "./app.js";
import {
    carritoVaciar
} from "./carritoIndex.js";

/* const modalContenedor = document.querySelector('.modal-container');
const modalCarrito = document.querySelector('.modal-carrito')
const abrirCarrito = document.getElementById('open')
 */

const vaciarCarrito = document.getElementById('vaciar')
const cerrarCarrito = document.getElementById('cerrar')
const finalizarCarrito = document.getElementById('finalizar')
const enviarCarrito = document.getElementById('enviar')

// Formulario modal para el envio del pedido

const myModalUno = document.getElementById('modal-Carrito')

const myModalDos = document.getElementById('modalFinalizar')
const myInputCustomerName = document.getElementById('customer-name')

// Posiciono el cursor en el campo nombre
myModalDos.addEventListener('shown.bs.modal', () => {
    myInputCustomerName.focus()
})

vaciarCarrito.addEventListener('click', () => {

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
    if (myInputCustomerName.value === "") {
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