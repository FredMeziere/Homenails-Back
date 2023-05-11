const { Purchase } = require("../models");
const UserPurchase  = require("../models/UserStretch");

const purchaseController = {
    getAllPurchases: async (req, res) => {
        const userId = req.token.sub;
        try {
            const purchases = await UserPurchase.findAll({
                where: { user_id: userId }
            });
            const purchaseTable = purchases.map(purchase => purchase.product_id);
            const promises = purchaseTable.map(purchaseProduct => Purchase.findByPk(purchaseProduct));
            const purchasesList = await Promise.all(promises);
            
            res.status(200).json(purchasesList);
        }

        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }},

    



    }

module.exports = purchaseController;