import {
  verificoStorage
} from "./app.js";
import {
  mostrarProductos
} from "./app.js";

// CLASE PARA DEFINIR LOS PRODUCTOS
class NewProductos {
  constructor(id, nombre, desc, precio, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.desc = desc;
    this.precio = precio;
    this.img = img;
    this.cantidad = cantidad;
    this.disponible = false;
  }

  disponibleSi() {
    this.disponible = true;
  }
}

const productos = [];

// FUNCION PARA OBTEBNER LOS PRODUCTOS CON FETCH
const cargarProductos = async () => {
  try {
    const response = await fetch("../productos/data.json");
    const productosJson = await response.json();

    productosJson.forEach((producto) => {

      productos.push(
        new NewProductos(
          producto.id,
          producto.nombre,
          producto.desc,
          producto.precio,
          producto.img,
          producto.cantidad
        )
      );
    });

    // ARMO LAS CARDS PARA MOSTRAR LOS PRODUCTOS
    mostrarProductos(productos);

    // VERIFICO SI HABIA ALGO EN LOCALSTORAGE
    verificoStorage();

  } catch (error) {
    console.log("error:" + error);
  }
};

// OBTENGO LOS PRODUCTOS CON LA FUNCION
cargarProductos();

export {
  productos
};