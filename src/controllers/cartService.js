import CartManager from "../daos/mongodb/CartManager.class.js";

const cartManager = new CartManager();

export const getCartByIdService = async (id) => {
    const cart = await cartManager.getCartById(id);
    return cart
};

export const getCartsService = async () => {
    const carts = await cartManager.getCarts();
    return carts
};

export const addCartService = async () => {
    await cartManager.addCart();
};

export const addProductToCartService = async (cid, pid) => {
    await cartManager.addProductToCart(cid, pid)
};

export const deleteProductFromCartService = async (cid, pid) => {
    await cartManager.deleteProductFromCart(cid, pid)
};

export const deleteAllProductsFromCartService = async (cid) => {
    await cartManager.deleteAllProductsFromCart(cid);
};

export const updateProductsFromCartService = async (cid, body) => {
    await cartManager.updateProductsFromCart(cid, body);
};

export const updateProductsQuantityService = async (cid, pid, quantity) => {
    await cartManager.updateProductsQuantity(cid, pid, quantity)
};