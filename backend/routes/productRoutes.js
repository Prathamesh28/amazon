import express from 'express'
import Product from '../models/productModels';

const router = express.Router();

router.get("/", async (req,res) => {
    const products = await Product.find();
    res.send(products);
});

router.post("/", async (req,res) => {
    const product = new Product({
    name:req.body.name,
    image:req.body.image,
    brand:req.body.brand,
    price: req.body.price,
    category:req.body.category,
    countInStock: req.body.countInStock,
    description:req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    });

    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: "New Product Created", data: newProduct})
    }
    return res.status(500).send({message: "Error Creating the Product"})
});

export default router;