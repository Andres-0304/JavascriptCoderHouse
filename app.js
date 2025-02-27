let continuar = true;
const IGV = 1.18;
let totalCarrito = 0;

const calcularIGV = (precio) => {
  return precio * IGV;
};

while (continuar) {
  let opcionIngresada = prompt(`Bienvenido/a, ingrese alguna de las opciones siguientes por favor:
      1- Ver productos
      2- Ver el total del carrito
      ESC- Salir de la tienda
  `);
  
  if (opcionIngresada === "1") {
    let condition = true;
    while (condition) {
      let eleccion = prompt(`Ingrese una opción para agregar al carrito el producto:
          1- Página de Venta de Productos (E-commerce)
          2- Páginas Corporativas
          3- Landing Pages
          4- Páginas de Portafolio
          5- Ver total del carrito
          ESC- Salir de agregar productos
      `);

      switch (eleccion) {
        case "1":
          totalCarrito += calcularIGV(2500);
          alert("Producto agregado al carrito.");
          break;
        case "2":
          totalCarrito += calcularIGV(1500);
          alert("Producto agregado al carrito.");
          break;
        case "3":
          totalCarrito += calcularIGV(800);
          alert("Producto agregado al carrito.");
          break;
        case "4":
          totalCarrito += calcularIGV(1000);
          alert("Producto agregado al carrito.");
          break;
        case "5":
          alert(`El total hasta el momento es S/ ${totalCarrito.toFixed(2)}`);
          break;
        case "ESC":
        case "esc":
          alert("Saliendo del catálogo...");
          condition = false;
          break;
        default:
          alert("Esa opción no está disponible");
          break;
      }
    }
  } else if (opcionIngresada === "2") {
    alert(`El total del carrito es: S/ ${totalCarrito.toFixed(2)}`);
  } else if (opcionIngresada.toLowerCase() === "esc") {
    continuar = false;
    alert("Gracias por tu visita.");
  } else {
    alert("Has ingresado un dato erróneo, intenta nuevamente...");
  }
}
