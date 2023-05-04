const { Category } = require("../models");

const categoryController = {

    // méthode pour récupérer toutes les catégories

async getAllCategories(req, res) {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
},

// méthode pour récupérer une catégorie par son id

async getOneCategory(req, res) {
    try {
        const category = await Category.findByPk(req.params.id);
        res.status(200).json(category);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
},

async createCategory(req, res) {
    try {   
        const {
            name
        } = req.body;

        const newCategory = await Category.create({
            name
        });

        res.status(201).json({
            id : newCategory.id,
            name: newName.id
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
},

//Modification ou non d'une catégorie ?

async deleteCategory(req, res) {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(204).end();
}, catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
}
};



module.exports = categoryController;


