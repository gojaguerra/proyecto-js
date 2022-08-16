import {
    carritoIndex
} from './carritoIndex.js';

// ARMA LAS CARDS DE LOS PRODUCTOS
const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById('producto-contenedor');

    productos.forEach(producto => {

        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML += `<div class="card" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Descripción:  ${producto.desc}</p>
                                <p class="card-text">Precio:$ ${producto.precio}</p>
                                <button class="btn btn-primary" id=boton${producto.id}>Comprar</button>
                            </div>
                        </div>`

        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener('click', () => {
            carritoIndex(producto.id);

            // SWEET ALERT
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Has agregado el producto: ${producto.nombre}`,
                showConfirmButton: false,
                timer: 1500
            })

        })

    })

}

export {
    mostrarProductos
};

export function verificoStorage() {

    // uso de OPERADORES AVANZADOS LOGICOS OR
    const listaProductos = JSON.parse(localStorage.getItem("carritoFG")) || [];

    // pongo el contador en cero, por si no hay items en el carrito
    let cantidadPedido = document.getElementById("contador-carrito");
    let cantidad = 0;
    cantidadPedido.innerHTML = `${cantidad}`;

    listaProductos.forEach(ele => {
        let i = 0;
        for (i = 0; i < ele.cantidad; i++) {
            carritoIndex(ele.id);
        }
    })

}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()