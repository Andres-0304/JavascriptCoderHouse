// Selecciona los formularios
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Maneja el registro
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-register').value;
        const password = document.getElementById('password-register').value;

        // Recupera la lista de usuarios desde localStorage o inicializa un array vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica si el correo ya está registrado
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este correo ya está registrado. Por favor, usa otro.",
            });
            return;
        }

        // Agrega el nuevo usuario a la lista
        const newUser = { name, email, password };
        users.push(newUser);

        // Guarda la lista actualizada en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire({
            title: "Registro exitoso. Ahora puedes iniciar sesión.",
            icon: "success",
            draggable: true
        });
        registerForm.reset();
    });
}

// Maneja el inicio de sesión
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Recupera la lista de usuarios desde localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Busca un usuario que coincida con el correo y la contraseña
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Redirige a index.html si las credenciales son correctas
            Swal.fire({
                title: `Bienvenido, ${user.name}!`,
                icon: "success",
                draggable: true
            }).then(() => {
                window.location.href = '../index.html';
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Correo o contraseña incorrectos.",
            });
        }
    });
}

// Funcionalidad de agregar al carrito
const cartButton = document.querySelector('.btn-cart');
const quantitySpan = cartButton?.querySelector('.quantity');

// Selecciona todos los botones de los productos
const productButtons = document.querySelectorAll('.productos .producto button');

// Recupera el valor de quantity desde localStorage o inicializa en 0
let quantity = parseInt(localStorage.getItem('quantity')) || 0;

// Actualiza el carrito con el valor inicial
if (cartButton) {
    cartButton.setAttribute('data-quantity', quantity);
    quantitySpan.textContent = quantity;
}

// Agrega un evento de clic a cada botón de producto
productButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Incrementa la cantidad
        quantity++;

        // Actualiza el atributo data-quantity y el texto del span
        if (cartButton) {
            cartButton.setAttribute('data-quantity', quantity);
            quantitySpan.textContent = quantity;
        }

        // Guarda el valor actualizado en localStorage
        localStorage.setItem('quantity', quantity);

        // Muestra un mensaje de confirmación
        Swal.fire({
            title: "Producto agregado al carrito!",
            icon: "success",
            draggable: true
        });
    });
});

// Funcionalidad del modal del carrito
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Recupera los productos del carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el modal del carrito
function updateCartModal() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        li.textContent = `${item.name} x${item.quantity} - S/.${itemTotal}`;
        cartItemsList.appendChild(li);
        total += itemTotal;
    });

    cartTotal.textContent = `Total: S/.${total}`;
}


// Abre el modal al hacer clic en el botón del carrito
if (cartButton) {
    cartButton.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'block';
    });
}

// Cierra el modal al hacer clic en la "X"
if (closeModal) {
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

// Cierra el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Función para agregar productos al carrito
function addToCart(product) {
    // Busca si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
        title: "Producto agregado al carrito!",
        icon: "success",
        draggable: true
    });
}

const productos = [
    { name: "Love Board Pretty", price: 80 },
    { name: "Hearts Board", price: 90 },
    { name: "Love Board", price: 100 }
];

productButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = productos[index];
        addToCart(product);
    });
});


