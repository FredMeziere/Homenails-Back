BEGIN;

CREATE DOMAIN "email" AS text CHECK (
    value ~ '^[-!#-''*+\/-9=?^-~]+(?:\.[-!#-''*+\/-9=?^-~]+)*@[-!#-''*+\/-9=?^-~]+(?:\.[-!#-''*+\/-9=?^-~]+)+$'
);

CREATE DOMAIN postal_code_europe AS TEXT CHECK (
        value ~ '^(0[1-9]|[1-8][0-9]|9[0-8])\d{3}$' -- Regex for validation of zipcode France 
        OR (value ~ '^\d{5}$' AND substr(value,1,1) IN ('0','1','2','3','4','5','6','7','8','9')) -- Regex for validation of zipcode Allemagne 
        OR (value ~ '^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$' AND substr(value,1,2) IN ('01', '02', '03', ... '52')) -- Regex for validation of zipcode Espagne 
        OR (value ~ '^\d{5}$' AND substr(value,1,2) IN ('00', '01', '20', ... '98')) -- Regex for validation of zipcode Italie 
        OR (value ~ '^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s*\d[A-Za-z]{2}$' AND substr(value,1,2) IN ('AB', 'AL', 'B', ... 'ZE')) -- Regex for validation of zipcode Angleterre 
        OR (value ~ '^\d{4}$'  AND substr(value,1,1) IN ('1','2','3','4','5','6','7','8','9')) -- Regex for validation of zipcode Belgique 
        OR (value ~ '^\d{4}\s*[A-Za-z]{2}$' AND substr(value,1,4) IN ('1000', '1011', '1012', ... '1098', '1099')) -- Regex for validation of zipcode Amsterdam
);

CREATE DOMAIN birthday_date AS TEXT CHECK (
        value ~ '^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$' -- Version jour/mois/années
);

CREATE DOMAIN phone_number AS TEXT CHECK (
        value ~ '^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$' -- REGEX pour la validation européenne des numéro marche pour tous les +XXX (tester)
);

CREATE DOMAIN civility AS TEXT CHECK (
    value ~ '^([M|m]adame|[M/m]ademoiselle|[M/m]onsieur|[A/a])utre$' -- Regex pour la vérification de la civilité
);

DROP TABLE IF EXISTS "user", 
 "category_product", "product", "product_image" "user_favorites", "purchase", "user_purchase"; -- Drop toutes les tables

CREATE TABLE "role" ( -- Création de la table  Role

        "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(12)
    );

CREATE TABLE "user" ( -- Création de la table  User

        "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "email" email NOT NULL UNIQUE,
        "password" VARCHAR NOT NULL,
        "firstname" VARCHAR NOT NULL,
        "lastname" VARCHAR NOT NULL,
        "civility" civility NOT NULL,
        "address" VARCHAR DEFAULT NULL,
        "aditionnal_address" VARCHAR DEFAULT NULL,
        "country" VARCHAR DEFAULT NULL,
        "city" VARCHAR DEFAULT NULL,
        "zipcode" postal_code_europe VARCHAR(6) DEFAULT NULL,
        "phone_number" phone_number INTEGER DEFAULT NULL,
        "role_id" INTEGER DEFAULT 2 REFERENCES "role"("id")
    );

CREATE TABLE "newsletter_mail_suscribed" ( -- Création de la table  newsletter_mail_suscribed pour les personnes voulant uniquement souscrire a la newslater
        "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "email" VARCHAR NOT NULL
);


CREATE TABLE "image" ( -- Création de la table image 

        "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "url_image" VARCHAR NOT NULL
);

CREATE TABLE "product" ( -- Création de la table product

        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- (INT PRIMARY KEY AUTO_INCREMENT ?)
        "title" VARCHAR(255)  NOT NULL,
        "description" TEXT NOT NULL,
        "price" INTEGER NOT NULL,
        "price_reduce" INTEGER DEFAULT NULL,
        "main_image" VARCHAR DEFAULT NULL,
        "guide_image" VARCHAR DEFAULT NULL,
        "category_id" INTEGER REFERENCES "category"("id"),
        'image_id' VARCHAR NOT NULL REFERENCES "image"("id"),
        "remaining_quantity" INT CHECK(quantity = 0 OR (quantite >= 1 AND quantite <= 9) OR quantite > 9)
    );

CREATE TABLE  "purchase" ( 

        "id" INT PRIMARY KEY AUTO_INCREMENT,
        "serial_number" INTEGER NOT NULL, -- numéro d'envoi par la poste ou id de la commande par exemple / ou numéro random 
        "content_description" text NOT NULL, -- Description des produits 
        "price" DECIMAL(3,2) NOT NULL, -- Prix d'un article qui peux etre de 3 chiffres + 2 apres la virgule  ex 29.99
        "date_purchase" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Date d'achat qui sera par défault l'heure ou l'achat sera rentré en base de donnée
        "status" VARCHAR(50) NOT NULL -- en cours (de traitement) / traitée / en livraison / terminée
);

CREATE TABLE "purchase_product" (

        "id" "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "purchase_id" INTEGER REFERENCES "category"("id"),
        "product_id" INTEGER REFERENCES "product"("id")

);

CREATE TABLE "category_product" (  -- Table jointure entre category et product N, N

        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "category_id" INTEGER REFERENCES "category"("id"),
        "product_id" INTEGER REFERENCES "product"("id"),
);

/*CREATE TABLE "image_product" ( 

        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL
);*/

CREATE TABLE  "user_purchase" (  -- Table jointure entre user et purchase N, N pour avoir la possibilité de récuperer tous les achats d'un utilisateur

        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "user_id" INTEGER REFERENCES "user"("id"),
        "purchase_id" INTEGER REFERENCES "purchase"("id"),
        UNIQUE ("user_id", "purchase_id")
);

CREATE TABLE "user_favorites" (  -- Table jointure entre user et favorites N, N pour avoir la possibilité de récuperer tous les favoris d'un utilisateur

        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "product_id" INTEGER NOT NULL REFERENCES "stretch"("id") ON DELETE CASCADE,
        UNIQUE ("user_id", "product_id")
);

CREATE TABLE "purchase_product" (

    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "purchase_id" INT REFERENCES "purchase"("id"),
    "product_id" INT REFERENCES "product"("id"),
    PRIMARY KEY ("purchase_id", "product_id")
);

COMMIT;