
# Application order_management

## Description


ABC corporation est une entreprise specialisée dans l'importation et exportation de produit. lors de la premiers phase du projet, j'ai modelisé avec succés leur fichier Excel en une base de donnée relationnelle.
dans cette nouvelle phase, l'entreprise fais appel moi pour ajouter de nouvelle fonctionalité gestion de paiement des commandes et developper une application(order_management) avec node.js pour gérer les opérations CRUD sur toutes les tables.

## Prérequis

Pour la prise en main correcte de l'application, il est nécessaire d'avoir installé les éléments suivants :
- nodejs
- MYSQL


## Installation

- Clonez le repository :

       git clone https://github.com/Mangassouba/order_management.git
 
- Accédez au dossier du projet

        cd order_management

- Installez les dépendances :

        npm install

 - Accédez au dossier du projet src

        cd src

- Lancez l'application en mode développement :

        node app.js

## Configuration de la base de données :

le fichier ./src/db.js est un fichier de configuration qui interagir avec la base de données. Avant d'execter l'application assurez vous de remplacer root par votre nom utilisateur et le mot de passe par mot de passe utilisateur, pour pouvoir se connecter à la base de données en local.


## Fonctionnalités


Customers
- get() : Permets de lister touts les clients;

- addCustomer(name : string, address : string, email : string, phone : string) : Permets d'ajouter un nouveau client;

- updateCustomer(id: int, name: string, address: string, email: string, phone: string) : Permets de modifier les données d'un client;

- destroyCustomer(id : int) : Permets de supprimer un client;

Products
- get() : Permets de lister tous les produits;

- addProduct(name: string, description: string, price: float, stock: string, category: string, barcode: string, status: string) : Permets d'ajouter un nouveau produit;

- updateProduct(id : int, name: string, description: string, price: float, stock: string, category: string, barcode: string, status: string) : Permets de modifier les données d'un produit;

- destroyProduct(id : int) : Permets de supprimer un produit;

Orders
- getOrderById(id : int) : Permets de lister une commande et ses details part id

- addOrder(date:date, delivery_address:string, customer_id:int, track_number:string, status:string) : Permets d'ajouter une nouvelle commande et ses details;

- updateOrder(id: int, title : string, type : string, survey_id : int) : Permets de modifier les données d'une commande 

- destroyOrder(id:int) : Permets de supprimer une commande et ses details;

Payments
- get() : Permets de lister tous les paiements;

- addPayment(id: int, order_id : int, date : string, amount : string, payment_method : string) : Permets d'ajouter un nouveau paiement;

- updatePayment(id: int, order_id : int, date : string, amount : string, payment_method : string) : Permets de modifier les données d'un paiement;

- destroyPayment(id: int) : Permets de supprimer une paiement;


## Auteur
Hama Houllah Mangasouba

https://github.com/Mangassouba
