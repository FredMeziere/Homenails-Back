const productController = {

    //Récuprer tous les étirements.
    async getAllProducts(req, res) {
        return res.json({ message:"Coucou, je suis un produit" });

        // On récupère la liste des étirements depuis la DB à partir du model Sequelize
        // try {
        //     const products = await ;
            //utilisation du .map pour mettre que les infos utilisés côté front
            // const filtredProducts = products.map(etirement => {
            //     return {
            //         id : product.id,
            //         title: product.title,
            //         main_image: product.main_image,
            //         categorie_id: product.category_id
            //     };
            // });
            // res.status(200).json(filtredProducts);

        // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.         
        // } catch (error) {
        //     console.log(error);
        //     return res.status(500).json({ error: "Internal server error" });
        // }
    },
}

module.exports = productController;