// Store data (Products, Categories, Carts)

const customers = [
  { userID: 1, userEmail: "amen@gmail.com", userName: "Emmanuel" },
  { userID: 2, userEmail: "kylle@gmail.com", userName: "Kylle" },
  { userID: 3, userEmail: "jaero@gmail.com", userName: "Jaero" },
];

const storeData = {
  carts: [
    { userID: 1, productID: 1, quantity: 2 }, 
    { userID: 1, productID: 2, quantity: 1 }, 
    { userID: 1, productID: 3, quantity: 6 },
    { userID: 2, productID: 4, quantity: 1 }, 
    { userID: 2, productID: 5, quantity: 2 }, 
    { userID: 2, productID: 6, quantity: 3 }, 
  ],
  products: [
    { productID: 1, productName: "Tinapay", categoryID: 101, price: 30, stock: 100 },
    { productID: 2, productName: "Kape", categoryID: 102, price: 50, stock: 200 },
    { productID: 3, productName: "Itlog", categoryID: 103, price: 10, stock: 150 },
    { productID: 4, productName: "Coke", categoryID: 102, price: 25, stock: 300 },
    { productID: 5, productName: "Pepsi", categoryID: 102, price: 20, stock: 250 },
    { productID: 6, productName: "Cobra", categoryID: 102, price: 30, stock: 180 },
  ],
  categories: [
    { categoryID: 101, categoryName: "Bakery" },
    { categoryID: 102, categoryName: "Beverages" },
    { categoryID: 103, categoryName: "Dairy" },
  ],
};


export { customers, storeData };
export const { carts, products, categories } = storeData;
export default storeData;
