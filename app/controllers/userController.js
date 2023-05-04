const { User } = require("../models");

const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function hashPassword(password) {
    // Hash du mot de passe pour qu'il ne soit plus en clair
    const saltRounds = 20; // 20 représente le nombre de "round" de complexité pour générer le salt
    // On génère d'abord un salt qui va permettre de faire en sorte que deux mdp identiques ne donnent pas le meme hash en sortie
    const salt = await bcrypt.genSalt(saltRounds);
    // Ensuite seulement on peut hasher le mdp avec le salt généré (qui sera du coup toujours différent et UNIQUE)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const userController = {

    //Formulaire d'inscription 


    async signUpForm(req, res) {
        const {
            gender,
            firstname,
            lastname,
            birthdate,
            email,
            emailconfirm,
            password,
            passwordconfirm,
        } = req.body;


        if (!gender || !firstname || !lastname || !birthdate || !email || !emailconfirm || !password || !passwordconfirm) {
            return res.status(400).json({ error: "Veuillez entrer toutes les informations" });
        }  
        
        if (emailValidator.validate(email)) {
            return res.status(400).json({ error: "Veuillez entrer une adresse email valide" });
        }

        if (password !== passwordconfirm) {
            return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
        }

        try {
            const alreadyExistingUser = await User.findOne({
                where: {
                    email
                }
            });

            if (alreadyExistingUser) {
                return res.status(400).json({ errorMessage: `L'email ${email} est déjà utilisé` });
            }

            // Vérification du couple mdp / confirmation de mdp
            if (password !== passwordConfirm) {
                return res.status(400).json({ errorMessage: `La confirmation de mot de passe ne correspond pas au mot de passe renseigné` });
            }
            
            const hashedPassword = await hashPassword(password);

            const newUser = await User.create({
                gender,
                firstname,
                lastname,
                birthdate,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                user: {
                    id: newUser.id,
                    gender : newUser.gender,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    birthdate: newUser.birthdate,
                    email: newUser.email,
                },
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    async loginFormSubmission(req, res) {
        const { email , password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Veuillez entrer toutes les informations" });
        }

        try {
            const existingUser = await User.findOne({
                where: {
                    email
                }
            });

            if (!existingUser) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            const hashedPassword = existingUser.password;
 
            const passwordValidation = await bcrypt.compare(password, hashedPassword);

            if (!passwordValidation) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            const payload = {
                sub: existingUser.id,
                isAdmin: existingUser.role_id
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
 
            res.status(200).json({
                message: "Connexion réussie !",
                token
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    logout(req, res) {
        res.json({ message: "Utilisateur déconnecté" });
    },

    async getUserInfo(req, res) {
        const userId = req.token.sub;
       
        const userFound = await User.findByPk(userId);
        const { id, email, password, ...filtredUserInfo } = { id: userFound.id, email: userFound.email, password: userFound.password, firstname : userFound.firstname, lastnamme : userFound.lastname , birthdate : userFound.birthdate, role_id: userFound.role_id};
        
        res.json({ filtredUserInfo })
    },

    async updateUser(req, res) {
        const { firstname, lastname, birthdate, email, address, additionnal_adress, zipcode, city} = req.body;

        const userId = req.token.sub;
        const userToUpdate = await User.findByPk(userId);

        if (firstname !== undefined) { 
            userToUpdate.username = username;
        }
        if (lastname!== undefined) { 
            userToUpdate.lastname = lastname;
        }
        if (birthdate !== undefined) { 
            userToUpdate.birthdate = birthdate;
        }
        if (email !== undefined) {
            userToUpdate.email = email;
        }   
        if (address !== undefined) {
            userToUpdate.address = address;
        }
        if (additionnal_adress !== undefined) {
            userToUpdate.additionnal_adress = additionnal_adress;
        }    
        if (zipcode !== undefined) {
            userToUpdate.zipcode = zipcode;
        }
        if (city !== undefined) {
            userToUpdate.city = city;
        }
        
        await userToUpdate.save();

        res.status(204).end();
    },

    async deleteUser(req, res) {
        
        const userId = req.token.sub;
        const userToDelete = await User.findByPk(userId);

        if (!userToDelete) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        await userToDelete.destroy();
        res.status(204).end();
    }
}

module.exports = userController;