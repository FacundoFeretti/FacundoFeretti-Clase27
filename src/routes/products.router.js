import { Router } from "express";
import { productManager } from "../server.js";
import socketServer from "../server.js";
import { getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService } from "../controllers/productsService.js";

const router = Router();


router.get('/', async (req, res) => {
   let limitCondition = req.query.limit;
   
   let limit = limitCondition ? Number(limitCondition) : 10
   let page = Number(req.query.page);
   let sort = Number(req.query.sort);
   let filter = req.query.filter;
   let filterValue = req.query.filtervalue;

   const conditions = {limit, page, sort, filter, filterValue}

   let products = await getProductsService(conditions)

    res.send({products})
})

router.get("/:id", async(req, res) => {
    const product = await getProductByIdService(req.params.id)
    res.send(product);
})

router.post("/", async (req, res) => {
    const product = req.body;
    try{
        await addProductService(product)
        res.status(200).send({status: "success"});
    } catch(er) {
        res.status(500).send({ error: er.message});
    }
});

router.put("/:id", async (req, res) => {
        try{
            await updateProductService(req.params.id, req.body)
            res.status(200).send({status: "success"})
        } catch(e) {
            res.status(500).send({ error: e.message})
        }

});

router.delete("/:id" , async (req, res) => {
    try{
        await deleteProductService(req.params.id)
        res.status(200).send({status: "success"})
    } catch(e) {
        res.status(500).send({ error: e.message})
    }
});

export default router;