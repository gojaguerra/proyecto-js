import {
    productos
} from "./stock.js";

let carritoCompras = [];

export const carritoIndex = (productoId) => {
    const contenedorCarrito = document.getElementById("carrito-contenedor")

    const renderProductoCarrito = () => {

        // buscar el producto dentro de la lista de productos
        let producto = productos.find(producto => producto.id == productoId)

        // busco el producto en el carrito
        let buscoProdCarrito = carritoCompras.find(enCarrito => enCarrito.id == productoId)

        // si ya esta en el carrito, actualizo cantidad y html
        if (buscoProdCarrito != undefined) {

            // uso de OPERADORES AVANZADOS SUGAR SINTAX ++
            buscoProdCarrito.cantidad++;

            let cantidadNueva = document.getElementById(`cantidad${producto.id}`);
            if (cantidadNueva) {
                cantidadNueva.innerHTML = `<p id="cantidad${producto.id}">Cantidad: ${buscoProdCarrito.cantidad}</p>`;
            } else {
                let div = document.createElement('div')
                div.classList.add('productoEnCarrito')
                div.setAttribute("id", `divprodid${producto.id}`)
                div.innerHTML = `<p>${producto.nombre}</p>
                                <p>Precio: ${producto.precio}</p> 
                                <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                                <button id="eliminar${producto.id}" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>
                    `
                contenedorCarrito.appendChild(div)

                // agrego evento para poder eliminar producto del carrito
                const boton = document.getElementById(`eliminar${producto.id}`)
                boton.addEventListener('click', () => {
                    carritoDelete(producto.id)
                })

            }

        } else {

            // no esta en el carrito, lo creo
            carritoCompras.push(producto)

            producto.cantidad = 1

            let div = document.createElement('div')
            div.classList.add('productoEnCarrito')
            div.setAttribute("id", `divprodid${producto.id}`)
            div.innerHTML = `<p>${producto.nombre}</p>
                            <p>Precio: ${producto.precio}</p> 
                            <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                            <button id="eliminar${producto.id}" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>
                `
            contenedorCarrito.appendChild(div)

            // agrego evento para poder eliminar producto del carrito
            const boton = document.getElementById(`eliminar${producto.id}`)
            boton.addEventListener('click', () => {
                carritoDelete(producto.id)
            })

        }

        // calculo totales
        const precioPedido = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)

        // actualizo total en el modal
        let totalPedido = document.getElementById("elTotal");
        totalPedido.innerHTML = `Total: $${precioPedido}`;

        // actualizo contador de cantidad en el header
        const cantidad = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0);
        let cantidadPedido = document.getElementById("contador-carrito");
        cantidadPedido.innerHTML = `${cantidad}`;

        // actualizo local storage
        localStorage.setItem("carritoFG", JSON.stringify(carritoCompras));

    }

    renderProductoCarrito();

}

export const carritoDeleteOK = (productoId) => {

    // buscar el producto dentro de la lista de productos
    let producto = productos.find(producto => producto.id == productoId);

    // obtengo el id dentro del carrito
    let buscoProdCarrito = carritoCompras.find(enCarrito => enCarrito.id == productoId);

    // lo encontre
    if (buscoProdCarrito != undefined) {

        // uso de OPERADORES AVANZADOS SUGAR SINTAX --
        buscoProdCarrito.cantidad--;

        // si el total es cero debo eliminar el item
        if (buscoProdCarrito.cantidad == 0) {

            let divABorrar = document.getElementById(`divprodid${producto.id}`);
            divABorrar.remove();

        } else {

            // actualizo cantidad y html
            let cantidadNueva = document.getElementById(`cantidad${producto.id}`);
            cantidadNueva.innerHTML = `<p id="cantidad${producto.id}">Cantidad: ${buscoProdCarrito.cantidad}</p>`;

        }

        const precioPedido = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)

        // actualizo total en el modal
        let totalPedido = document.getElementById("elTotal");
        totalPedido.innerHTML = `Total: $${precioPedido}`;

        // actualizo contador de cantidad en el header
        const cantidad = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0);
        let cantidadPedido = document.getElementById("contador-carrito");
        cantidadPedido.innerHTML = `${cantidad}`;

        // actualizo local storage
        localStorage.removeItem("carritoFG");
        localStorage.setItem("carritoFG", JSON.stringify(carritoCompras));

    }

}

export const carritoVaciar = () => {
    carritoCompras = [];
}

export const carritoDelete = (productoId) => {

    // buscar el producto dentro de la lista de productos
    let producto = productos.find(producto => producto.id == productoId);

    // SWEET ALERT
    Swal.fire({
        title: '¿Estas seguro?',
        text: `Eliminando ${producto.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

            carritoDeleteOK(productoId);

            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado!',
                'success'
            )
        }
    })
}