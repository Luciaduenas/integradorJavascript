const productsData = [
    {
      id: 1,
      name: "Baby Box Cat Craft-A-Riffic Room",
      price: 9.59,
      category: "Action Figures",
      cardImg: "Assets/Products/Action Figures/Baby Box Cat Craft-A-Riffic Room 9,59.jpg",
    },
    {
     id: 2,
     name: "Carlita & Pandy Paws Picnic Set",
     price: 18.99,
     category: "Action Figures",
     cardImg: "Assets/Products/Action Figures/Carlita & Pandy Paws Picnic Set 18,99.jpg",
    },
    {
     id: 3,
     name: "Carlita Purr-ific Play Room",
     price: 15.99,
     category: "Action Figures",
     cardImg: "Assets/Products/Action Figures/Carlita Purr-ific Play Room 15,99 .jpg",
    },
    {
     id: 4,
     name: "Dance Party Theme Figure Set",
     price: 20.99,
     category: "Action Figures",
     cardImg: "Assets/Products/Action Figures/Dance Party Theme Figure Set 20,99.jpg",
    },
    {
     id: 5,
     name: "Deluxe Figure Gift Set",
     price: 19.99,
     category: "Action Figures",
     cardImg: "Assets/Products/Action Figures/Deluxe Figure Gift Set 19,99.jpg",
    },
    {
     id: 6,
     name: "Gabby's Dollhouse Purrfect Dollhouse Playset",
     price: 56.99,
     category: "Action Figures",
     cardImg: "Assets/Products/Action Figures/Gabby's Dollhouse Purrfect Dollhouse Playset 56,99.jpg",
    },
    {
    id: 7,
    name: "Pandy paws birthday figure set",
    price: 24.99,
    category: "Action Figures",
    cardImg: "Assets/Products/Action Figures/Pandy paws birthday figure set 24,99.jpg",
    },
    {
    id: 8,
    name: "Pool Playset",
    price: 24.99,
    category: "Action Figures",
    cardImg: "Assets/Products/Action Figures/Pool Playset 24,99.jpg",
    },
    {
    id: 9,
    name: "Transforming Garden Treehouse Playset",
    price: 31.99,
    category: "Action Figures",
    cardImg: "Assets/Products/Action Figures/Transforming Garden Treehouse Playset 31,99.jpg",
    },
    {
    id: 10,
    name: "Transforming Garden Treehouse Playset",
    price: 14.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/8 games under 1 roof $14.jpg",
    },
    {
    id: 11,
    name: "Giant floor puzzle",
    price: 10.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/Giant floor puzzle $10.jpg",
    },
    {
    id: 12,
    name: "Matching game",
    price: 7.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/matching game.jpg",
    },
    {
    id: 13,
    name: "Mini memory card game",
    price: 5.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/Mini memory card game $5.jpg",
    },
    {
    id: 14,
    name: "Press-O-Matic",
    price: 12.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/Press-O-Matic.jpg",
    },
    {
    id: 15,
    name: "Puzzle 4 in one",
    price: 7.00,
    category: "Board Games",
    cardImg: "Assets/Products/Board games/Puzzle 4 in one $7.jpg",
    },
    {
    id: 16,
    name: "Gabby",
    price: 14.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Gabby.jpg",
    },
    {
    id: 17,
    name: "Baby box Cat",
    price: 12.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Baby box Cat.jpg",
    },
    {
    id: 18,
    name: "Cakey Cat",
    price: 10.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Cakey Cat.jpg",
    },
    {
    id: 19,
    name: "Cat Rat",
    price: 12.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Cat Rat.jpg",
    },
    {
    id: 20,
    name: "Dj Catnip",
    price: 14.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Dj Catnip.jpg",
    },
    {
    id: 21,
    name: "Kitty Fairy",
    price: 12.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Kitty Fairy.jpg",
    },
    {
    id: 22,
    name: "Mercat",
    price: 10.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Mercat.jpg",
    },
    {
    id: 23,
    name: "Pandy Paws",
    price: 14.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Pandy Paws.jpg",
    },
    {
    id: 24,
    name: "Pillow Cat",
    price: 12.00,
    category: "Plush Toys",
    cardImg: "Assets/Products/Plush toys/Pillow Cat.jpg",
    },
]

// Divido la lista de productos. Devuelve un array con grupitos de productos
const divideProductsInParts = (size) => {
    let productsList = [] // Creo el array nuevo
    for (let i = 0; i < productsData.length; i+= size) {
      productsList.push(productsData.slice(i,i + size)) 
    } // le cargo la lista dividida en la cantidad que se indique por parametro
    return productsList; // devuelve el array de grupos de productos
  }

 
//  Este es el estado de aplicación, indica cuando hay un cambio y debe actualizarse la página
const appState = {                         
  products: divideProductsInParts(3), 
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(3).length, 
  activeFilter: null
}
 
