import { productManager } from "../server.js";
import socketServer from "../server.js";

export const getProductsService = async (conditions) => {
    let filters = {};
    if(conditions.filter != "" && conditions.filterValue != ""){
        filters = {[conditions.filter] : conditions.filterValue};
    }    
    return productManager.getProducts(filters, conditions)

}

export const getProductByIdService = async (id) => {
    const product = await productManager.getProductById(id)
    return product
}

export const addProductService = async (product) => {
    const newProduct = await productManager.addProduct(
        product
    );
    socketServer.emit('newProduct', newProduct);
}

export const updateProductService = async (id, body) => {
    const product = await productManager.updateProduct(id, body)
    socketServer.emit('updateProduct', product)
}

export const deleteProductService = async (id) => {
    await productManager.deleteProduct(id)
        socketServer.emit('deleteProduct', id)
}