// Lista de productos
const productos = [
    { id: 1, nombre: "Página E-commerce", precio: 2500 },
    { id: 2, nombre: "Páginas Corporativas", precio: 1500 },
    { id: 3, nombre: "Landing Pages", precio: 800 },
    { id: 4, nombre: "Página de Portafolio", precio: 1000 }
];


const contenedorProductos = document.getElementById("productos");
const carritoContainer = document.getElementById("carritoContainer");
const carritoLista = document.getElementById("carrito");
const verCarritoBtn = document.getElementById("verCarrito");

// Mostrar productos en la lista
productos.forEach(producto => {
    let li = document.createElement("li");
    li.innerHTML = `
        ${producto.nombre} - S/.${producto.precio}
        <button class="agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(li);
});

// Función para agregar productos al carrito (agrupando repetidos)
const agregarAlCarrito = (id) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

    if (carrito[id]) {
        carrito[id].cantidad++;
    } else {
        let producto = productos.find(p => p.id == id);
        carrito[id] = { ...producto, cantidad: 1 };
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Mostrar carrito agrupando productos repetidos
const mostrarCarrito = () => {
    carritoLista.innerHTML = "";
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

    if (Object.keys(carrito).length === 0) {
        carritoLista.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        Object.values(carrito).forEach(producto => {
            let li = document.createElement("li");
            li.innerHTML = `${producto.cantidad} x ${producto.nombre} - S/.${producto.precio * producto.cantidad}`;
            carritoLista.appendChild(li);
        });
    }

    carritoContainer.classList.remove("oculto");
};

// Evento para ver carrito
verCarritoBtn.addEventListener("click", mostrarCarrito);

// Evento para agregar productos
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar")) {
        let id = e.target.dataset.id;
        agregarAlCarrito(id);
    }
});
