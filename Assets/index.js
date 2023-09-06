// STORE elements
const productsContainer= document.querySelector('.store-products');
const categoriesContainer = document.querySelector('.store-filter');
const categoriesList =document.querySelectorAll('.category');
const showMoreBtn = document.querySelector('.show-more-btn')
// CART & NAV related elements
const cartBubble = document.querySelector('.cart-bubble');
const cartBtn = document.querySelector('.cart-label');
const menuBtn = document.querySelector('.menu-label');
const cartMenu = document.querySelector('.cartmenu');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');
const productsCart = document.querySelector('.cart-items');
const total = document.querySelector('.total');
const buyBtn = document.querySelector('.chekout-btn');
const deleteBtn = document.querySelector('.clear-btn');
// CONTACT FORM elements
const form = document.getElementById ('form');
const inputName = document.getElementById ('input-name');
const inputMail = document.getElementById ('input-email');
const inputSubject = document.getElementById ('subject');
const submit = document.getElementById('submit-btn')
const formMessage = document.getElementById ('form-message')
// Add modal
const addModal = document.querySelector('.add-modal');



// Seteo el cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// ---------------- STORE ----------------

// Función para crear el HTML de la CARD
const createProductTemplate = (product) => {
    const {id, name, price, cardImg} = product;
    return`
    <div class="product-card">
                    <img src="${cardImg}">
                    <h3 class="name">${name}</h3>
                    <h3 class="price">$ ${price} <span>usd</span></h3>
                    <button class="add-btn hoverbtn" 
                    data-id="${id}"
                    data-name="${name}"
                    data-price="${price}"
                    data-cardImg="${cardImg}" >Add to Cart</button>
                </div>`
}

// Función para RENDERIZAR la CARD
const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList.map (createProductTemplate).join("");
};

// Función para VER MÄS
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
  };

//   Función para mostrar más producto al Ver más
const showMoreProducts =() => {
    appState.currentProductsIndex +=1;
    let {products, currentProductsIndex} = appState;
    renderProducts (products[currentProductsIndex]);
     if (isLastIndexOf()) { showMoreBtn.classList.add("hidden");
    }
};

// Función para mostrar u ocultar el boton de ver mas
const setShowMoreVisibility = ()=>{
    if (!appState.activeFilter){
        showMoreBtn.classList.remove ("hidden");
        return;
    }
    showMoreBtn.classList.add("hidden")
};

// ---------------- STORE FILTERS ----------------
// Acá le aplico la clase active al filtro seleccionado.
const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
      if (categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove('active');
        return;
      }
      categoryBtn.classList.add('active');
    });
  };

// Función para cambiar el estado del filtro activo
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category
    changeBtnActiveState (appState.activeFilter) // Indico el filtro activo por parametro a las funciones anteriores
    setShowMoreVisibility (appState.activeFilter) // Indico el filtro activo por parametro a las funciones anteriores
};

// Esta funcion chequea que lo seleccionado sea una boton de category y NO tiene la clase "active"
const isInactiveFilterBtn = (element) => {
    return (
      element.classList.contains('category') &&
      !element.classList.contains('active')
    );
  };

// Esta funcion aplica el filtro. Acá se aplican todas las funciones relacionadas al filtro
const applyFilter = (event) => {
    const { target } = event;
    if (!isInactiveFilterBtn(target)) return;
    productsContainer.innerHTML = '';
    changeFilterState(target)
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
      }

      renderProducts(appState.products[0]);  
};

// Funcion para renderizar los productos que cohinciden con el filtro activo. Primero filtro el array de products data,, y luego ese nuevo array filtrado ingresa por parámetro para renderizarse. Esto se usa en la funcion anterior que es la que hace todo con respecto a los filtros applyFilter
const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};



// ---------------- CART ----------------
// Activa el overlay y muestra y oculta el menu o el cart segun que fue seleccionado
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    if (cartMenu.classList.contains('open-cart')) {
      cartMenu.classList.remove('open-cart');
      return;
    }
    overlay.classList.toggle('show-overlay');
  };

  const toggleCart = () => {
    cartMenu.classList.toggle('open-cart');
    if (barsMenu.classList.contains('open-menu')) {
      barsMenu.classList.remove('open-menu');
      return;
    }
    overlay.classList.toggle('show-overlay');
  };

// Para cerrar el menu y ocultar el overlay
const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');
  };
// Cierra los menu con el scroll
  const closeOnScroll = () => {
    if (
      !barsMenu.classList.contains('open-menu') &&
      !cartMenu.classList.contains('open-cart')
    )
      return;
  
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
  };

  
// Cierra los menu con el click  
  const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
  };

  const createCartProductTemplate = (cartProduct) => {
    const { id, name, price, cardImg, quantity } = cartProduct;
    return`
    <div class="cart-item">
                    <img src="${cardImg}">
                    <div class="cart-item-info">
                      <h4>${name}</h4>
                      <p class="price"><span>${price}</span>usd</p>
                    </div>
                    <div class="quantity">
                    <span class="minus hoverbtn clickedbtn" data-id=${id}>-</span>
                    <span class="qty">${quantity}</span>
                    <span class="plus hoverbtn clickedbtn" data-id=${id}>+</span>
               </div>
            </div>`;
};

// Funcion que renderiza los productos del carrito o un mensaje de "vacío"
const renderCart = () => {
    if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg">The shopping cart is empty</p>`;
      return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join('');
  };  
  
// Función para sumar el total
const getCartTotal = () => {
  return cart.reduce(
    (accumulator, current) =>
      accumulator + Number(current.price) * current.quantity,
    0
  );
};

// Mostrar el total en el html class=total
const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)}`;
};

// Cambiar el numero de articulos en la burbuja
const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

// Activa o desactiva cualquier boton
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add('disabled');
    btn.classList.remove('hoverbtn');
  } else {
    btn.classList.remove('disabled');
    btn.classList.add('hoverbtn');
  }
};

// Guardar el carrito en el local Storage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// El estado del carrito, lo que activa todas las funciones del carrito
const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

// Voy a convertir el objeto recibido al apretar el boton buy de la card en otro para manipularlo en el cart
const createProductData = ({ id, name, price, cardImg}) => {
  return {
    id,
    name,
    price,
    cardImg,
  };
};

// Chequeo si ya hay un producto igual en el carrito
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// Sumo una unidad si producto ya existe en el carrito o agrego el producto nuevo al carrito
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => cartProduct.id === product.id
    ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
    : cartProduct);
};

// Creo el carrito nuevo con el producto nuevo
const createCartProduct = (product) =>{
    cart = [...cart, {...product, quantity: 1}]
}

// Mostrar mensaje de exito y ocultarlo luego de 1.5 seg
const showSuccessModal = (msg) => {
  addModal.classList.add("active-modal")
  addModal.textContent = msg
  setTimeout(() =>{
      addModal.classList.remove("active-modal")
  }, 1500);
};

// Función para añadir al carrito que usa todas las funciones anteriores
const addProduct = (e) => {
  if (!e.target.classList.contains('add-btn')) return;
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product)
    showSuccessModal("Another unit has been added to the shopping cart")
  }else{
    createCartProduct(product)
    showSuccessModal("The selected item was succesfully add to the shopping cart")
  }
  updateCartState()
};

// Suma una unidad con el boton más
const handlePlusBtnEvent = (id) =>{
  const existingCartProduct = cart.find((item) => item.id === id)
  addUnitToProduct(existingCartProduct)
}

// Restor una unidad o eliminar el producto en caso que hubiese una sola unidad usa dos funciones definidas más abajo.
const handleMinusBtnEvent = (id) =>{
  const existingCartProduct = cart.find((item) => item.id === id)

  if(existingCartProduct.quantity === 1){
    if(window.confirm("Do you wish to remove the selected item?")){
      removeProductFromCart(existingCartProduct)
    }
    return;
  }
  subtractProductUnit(existingCartProduct)
}

// Filtra el producto elegido, dejando un nuevo array sin ese producto
const removeProductFromCart = (product) =>{
  cart = cart.filter((item) => item.id !== product.id)
  updateCartState()
}

// Resta una unidad de un producto
const subtractProductUnit = (product) =>{
  cart = cart.map((item) => {
    return item.id === product.id ?
    { ...item, quantity: Number(item.quantity) - 1 }
    : item
  });
  }

  // Activo las funciones de sumar o restar al hacer click en los botones minus y plus / y actualizo el carrito.
  const handleQuantity = (e) => {
    if(e.target.classList.contains("minus")){
      handleMinusBtnEvent(e.target.dataset.id)
    }else if (e.target.classList.contains("plus")){
      handlePlusBtnEvent(e.target.dataset.id)
    }
  
    updateCartState()
  };
  
  // Función para vaciar el carrito, vacía el array de productos del carrito
  const resetCartItems = () =>{
    cart = []
    updateCartState()
  }

 // Función para completar la compra o eliminarla 
const completeCartAction = (confirmMsg, successMsg) =>{
  if(!cart.length) return;
  if(window.confirm(confirmMsg)){
    resetCartItems()
    alert(successMsg)
  }
}  

// Mensage de confirmación de compra, se envia por parametro a la funcion anterior.
const completeBuy = () =>{
  completeCartAction("Do you wish to confirm your order?", "Thank you for your order!")
}

// Mensage de confirmación para borrar el carrito, se envia por parametro a la funcion anterior.
const deleteCart = () =>{
  completeCartAction("Do you whis to remove all items in the shopping cart?", "Your shopping cart is empty")
}


// ---------------- FORM ----------------

// Funcion para validar los datos del formulario de contacto
const isEmpty = (input) => {
  return !input.value.trim().length;
};

const isValidName = (input) => {
  let valid = false;
  if (isEmpty(input)) {
        formMessage.classList.remove("hidden")
        formMessage.innerHTML='Please enter your name'
        return;
    } 
    valid = true;
    return valid;
  }

const isValidEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
        formMessage.classList.remove("hidden")
        formMessage.innerHTML='Please enter a valid email'
        return;
    }
  
    valid = true;
    return valid;
    
  }

 const isValidText = (input) => {
  let valid = false;
  if (isEmpty(input)) {
        formMessage.classList.remove("hidden")
        formMessage.innerHTML='Please leave a message'
        return;
    }

    valid = true;
    return valid;
  } 

 const validateForm = (e) =>{
  e.preventDefault();
  let validName = isValidName (inputName);
  let validEmail = isValidEmail (inputMail);
  let validText = isValidText(inputSubject);

  let isValidForm =
  validName &&
  validEmail &&
  validText;

  if(isValidForm){
    formMessage.classList.remove("hidden")
    formMessage.innerHTML='Thank you for your message.'
    form.reset();
  } 
 }


// ---------------- INIT ----------------
const init = () =>{
  renderProducts (appState.products[0])
  showMoreBtn.addEventListener("click", showMoreProducts)
  categoriesContainer.addEventListener("click", applyFilter)
  cartBtn.addEventListener("click", toggleCart)
  menuBtn.addEventListener("click", toggleMenu)
  window.addEventListener("scroll", closeOnScroll)
  barsMenu.addEventListener("click", closeOnClick)
  overlay.addEventListener("click", closeOnOverlayClick)
  document.addEventListener("DOMContentLoaded", renderCart)
  document.addEventListener("DOMContentLoaded", showCartTotal)
  productsContainer.addEventListener("click", addProduct)
  productsCart.addEventListener("click", handleQuantity)
  buyBtn.addEventListener("click", completeBuy)
  deleteBtn.addEventListener("click", deleteCart)
  disableBtn(buyBtn)
  disableBtn(deleteBtn)
  renderCartBubble(cart)
  form.addEventListener("submit", validateForm);
  inputName.addEventListener("input",()=> isValidName(inputName));
  inputMail.addEventListener("input",()=> isValidEmail(inputMail));
  inputSubject.addEventListener("input",()=> isValidText(inputSubject));
}

init ()