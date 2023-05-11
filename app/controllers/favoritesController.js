const { Favorite } = require('../models');
const  UserFavorites = require('../models');

const favoriteController = {
    getAllFavorites: async (req, res) => {
        const userId = req.token.sub;
        try {
            const favorites = await UserFavorites.findAll({
                where: { user_id: userId }
            });
            const favoriteTable = favorites.map(favori => favori.product_id);
            const promises = favoriteTable.map(favoriteProduct => Favorite.findByPk(favoriteProduct));
            const favoritesList = await Promise.all(promises);
            
            res.status(200).json(favoritesList);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    
    addOneFavorite: async (req, res) => {
        try {
            const userId = req.token.sub;
            const productId = req.params.id
        
            const favoriteProduct = await UserFavorites.findOne({
                where: { user_id: userId, product_id: productId }
            });
            
            if (favoriteProduct) {
                return res.status(409).json({ message: 'Already in favorites' });
            }

            const newFavorite = await UserFavorites.create({
                user_id: userId,
                product_id: productId
            });
            
            return res.status(201).json(newFavorite);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'error' });
        }
    },


    deleteOneFavorite: async (req, res) => {
        try {
            const userId = req.token.sub;
            const productId = req.params.id;

            const favoriteProduct = await UserFavorites.findOne({
                where: { user_id: userId, product_id: productId }
            });

            if (!favoriteProduct) {
                return res.status(404).json({ message: 'Favorite not found' });
            }

            
            await favoriteProduct.destroy();

            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting favorite' });
        }
    }


};

module.exports = favoriteController;