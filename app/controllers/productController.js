const { Product } = require("../models");

const productController = {

    async getAllProduct(req, res) {

     
        try {
            const Product = await Stretch.findAll();
           
            const filtredProduct = Product.map(produit => {
                return {
                    id : produit.id,
                    title: produit.title,
                    description: produit.description,
                    price: produit.price,
                    price_reduce: produit.price_reduce,
                    main_image: produit.main_image,
                    guide_image: produit.guide_image,
                    category_id: produit.category_id,
                    image_id: produit.image_id,
                    remaining_quantity: produit.remaining_quantity
                };
            });
            res.status(200).json(filtredProduct);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    async getOneProduct(req, res) {
        
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
            res.status(200).json(product);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    async createProduct(req, res) {
        try {
            const {
                title,
                description, 
                price,
                price_reduce,
                main_image, 
                guide_image,
                category_id,
                image_id,
                remaining_quantity
            } = req.body;

            const newProduct = await Product.create({ 
                title,
                description, 
                price,
                price_reduce,
                main_image, 
                guide_image,
                category_id,
                image_id,
                remaining_quantity
            }); 
            
            res.status(201).json({
                stretch: {
                    id: newProduct.id,
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    price_reduce: newProduct.price_reduce,
                    main_image: newProduct.main_image,
                    guide_image: newProduct.guide_image,
                    category_id: newProduct.category_id,
                    image_id: newProduct.image_id,
                    remaining_quantity: newProduct.remaining_quantity
                },
            });

    
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    async updateProduct(req, res) {
        const {title, description, price, price_reduce, main_image, guide_image, category_id, image_id, remaining_quantity} = req.body;
        const productId = req.params.id;
        const productToUpdate = await Stretch.findByPk(productId);

        if (title !== undefined) {
            productToUpdate.title = title;
        }
        if (description !== undefined) {
            productToUpdate.description = description;
        }
        if (price !== undefined) {
            productToUpdate.price = price;
        }
        if (price_reduce !== undefined) {
            productToUpdate.price_reduce = price_reduce;
        }
        if (main_image !== undefined) {
            productToUpdate.main_image = main_image;
        }
        if (guide_image !== undefined) {
            productToUpdate.guide_image = guide_image;
        }
        if (category_id !== undefined) {
            productToUpdate.category_id = category_id;
        }
        if (image_id !== undefined) {
            productToUpdate.image_id = image_id;
        }
        if (remaining_quantity !== undefined) {
            productToUpdate.remaining_quantity = remaining_quantity;
        }
        
        await productToUpdate.save();

        res.status(200).json();

    },

    async deleteProduct(req, res) {
        const productId = req.params.id;
        const productToDelete = await Product.findByPk(productId);
        if (!productToDelete) {
            return res.status(404).json({ error: "Product not found" });
        }
        await productToDelete.destroy();
        res.status(200).json();
    }



};
module.exports = productController;