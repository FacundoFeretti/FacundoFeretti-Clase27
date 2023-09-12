import { Router } from "express";
import { getCartByIdService, getCartsService, addCartService,addProductToCartService, deleteProductFromCartService, deleteAllProductsFromCartService, updateProductsFromCartService, updateProductsQuantityService } from "../controllers/cartService.js";

const router = Router();

router.get("/:id", async (req, res) => {
    const cart = await getCartByIdService(req.params.id);
    res.send(cart);
});

router.get('/', async( req, res ) => {
    const carts = await getCartsService();
    res.send(carts);
});

router.post('/', async (req, res) => {
    await addCartService();
    res.send({status: 'success'})
});

router.post('/:cid/product/:pid', async (req, res) => {
    await addProductToCartService(req.params.cid, req.params.pid)
    res.send({status: 'success'})
});

router.delete('/:cid/product/:pid', async (req, res) => {
    await deleteProductFromCartService(req.params.cid, req.params.pid);
    res.send({status: 'success'})
});

router.delete('/:cid', async (req, res) => {
    await deleteAllProductsFromCartService(req.params.cid);
    res.send({status: 'success'})
});

router.put('/:cid', async (req,res) => {
    await updateProductsFromCartService(req.params.cid, req.body);
    res.send({status: 'success'})
});

router.put('/:cid/product/:pid', async (req, res) =>{
    await updateProductsQuantityService(req.params.cid, req.params.pid, req.body.quantity)
    res.send({status: 'success'})
});
export default router;