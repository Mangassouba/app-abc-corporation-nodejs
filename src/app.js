const customerModule = require("./customerModule");
const productModule = require("./productModule");
const orderModule = require("./orderModule");
const paymentModule = require("./paymentModule");
const readlineSync = require("readline-sync");

function mainMenu() {
  console.log("\n***** MENU PRINCIPAL *****");
  console.log("1. Gérer les clients");
  console.log("2. Gérer les produits");
  console.log("3. Gérer les commandes d'achat");
  console.log("4. Gérer les paiements");
  console.log("0. Quitter");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

function customerMenu() {
  console.log("\n***** GESTION DES CLIENTS *****");
  console.log("1. Ajouter un client");
  console.log("2. Lister tous les clients");
  console.log("3. Mettre à jour les informations d'un client");
  console.log("4. Supprimer un client");
  console.log("0. Retourner au menu principal");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

function productMenu() {
  console.log("\n***** GESTION DES PRODUITS *****");
  console.log("1. Ajouter un produit");
  console.log("2. Lister tous les produits");
  console.log("3. Mettre à jour les informations d'un produit");
  console.log("4. Supprimer un produit");
  console.log("0. Retourner au menu principal");
  const choice = readlineSync.question("Votre choix : ");
  return choice;
}

function purchaseMenu() {
  console.log("\n***** GESTION DES COMMANDES D'ACHAT *****");
  console.log("1. Ajouter une commande d'achat");
  console.log("2. Mettre à jour les informations d'une commande d'achat");
  console.log("3. Lister la commande d'achat");
  console.log("4. Supprimer la commande d'achat");
  console.log("0. Retourner au menu principal");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

function paymentMenu() {
  console.log("\n***** GESTION DES PAIEMENTS *****");
  console.log("1. Ajouter un paiement");
  console.log("2. Lister tous les paiements");
  console.log("3. Mettre à jour les informations d'un paiement");
  console.log("4. Supprimer un paiement");
  console.log("0. Retourner au menu principal");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

function detailMenu() {
  console.log("1. Ajouter une commande");
  console.log("2. Sauvegarder les commandes et quitter");
  console.log(" 3. Quitter sans sauvegarder");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

async function main() {
  try {
    let mainChoice = mainMenu();
    while (mainChoice !== "0") {
      switch (mainChoice) {
        case "1":
          let customerChoice = customerMenu();
          while (customerChoice !== "0") {
            switch (customerChoice) {
              case "1":
                const name = readlineSync.question("Entrez le nom : ");
                // const orderDetail = [];

                // let add = true; 

                // while (add) {
                //   const choix = detailMenu(); 

                //   switch (choix) {
                //     case "1":
                //       const quantity = readlineSync.questionInt(
                //         "Entrez une quantité: "
                //       );
                //       const price =
                //         readlineSync.questionFloat("Entrez le prix: ");
                //       const produit_id = readlineSync.questionInt(
                //         "Entrez l'ID du produit: "
                //       );
                //       const order_id = readlineSync.questionInt(
                //         "Entrez l'ID de la commande: "
                //       );

                //       orderDetail.push({
                //         quantity,
                //         price,
                //         produit_id,
                //         order_id,
                //       });
                //       break;

                //     case "2":
                //       for (let i = 0; i < orderDetail.length; i++) {
                //         const detail = orderDetail[i];
                //         await orderModule.addOrderDetails(
                //           detail.quantity,
                //           detail.price,
                //           detail.produit_id,
                //           detail.order_id
                //         );
                //       }
                //       console.log("Les commandes ont été enregistrées.");
                //       add = false; 
                //       break;

                //     case "3":
                //       console.log("Vous avez quitté sans sauvegarder.");
                //       add = false; 
                //       break;

                //     default:
                //       console.log("Option invalide, veuillez réessayer.");
                //       break;
                //   }
                // }
                const address = readlineSync.question(
                  "Entrez votre address : "
                );
                const email = readlineSync.question("Entrez votre email : ");
                const phone = readlineSync.question(
                  "Entre votre numero de telephone : "
                );
                await customerModule.addCustomer(name, address, email, phone);
                console.log("client ajouté avec succès !");
                break;
              case "2":
                const list = await customerModule.get();
                console.log(list);
                break;
              case "3":
                const id = readlineSync.question("Entrez id : ");
                const namen = readlineSync.question("Entrez le nom : ");
                const addres = readlineSync.question("Entrez votre address : ");
                const emails = readlineSync.question("Entrez votre email : ");
                const phonee = readlineSync.question(
                  "Entre votre numero de telephone : "
                );
                await customerModule.updateCustomer(
                  id,
                  namen,
                  addres,
                  emails,
                  phonee
                );
                // console.log("client ajouté avec succès !");
                break;
              case "4":
                const deleteId = readlineSync.questionInt(
                  "Entrez l'id du client à supprimer: "
                );
                const deleteResult = await customerModule.destroyCustomer(
                  deleteId
                );
                console.log(`Number of rows deleted: ${deleteResult}`);
                break;
              default:
                console.log("Invalid option");
                break;
            }
            customerChoice = customerMenu();
          }
          break;

        case "2":
          let productChoice = productMenu();
          while (productChoice !== "0") {
            switch (productChoice) {
              case "1":
                const nameProduct = readlineSync.question(
                  "Entrez nom d'un produit : "
                );
                const description = readlineSync.question(
                  "Entrez la description: "
                );
                const price = readlineSync.questionFloat("Entrez le prix : ");
                const stock = readlineSync.questionInt("Entre stock : ");
                const category = readlineSync.question("Entre la categorie: ");
                const borcode = readlineSync.question("Entre la bar code: ");
                const status = readlineSync.question("Entre le status : ");
                await productModule.addProduct(
                  nameProduct,
                  description,
                  price,
                  stock,
                  category,
                  borcode,
                  status
                );
                console.log("produits ajouter avec succés");
                break;
              case "2":
                const list = await productModule.get();
                console.log(list);
                break;
              case "3":
                const productId = readlineSync.question("Entrez id : ");
                const nameProducts = readlineSync.question(
                  "Entrez nom d'un produit : "
                );
                const descriptions = readlineSync.question(
                  "Entrez la description: "
                );
                const prices = readlineSync.questionFloat("Entrez le prix : ");
                const stocks = readlineSync.questionInt("Entre stock : ");
                const categorys = readlineSync.question("Entre la categorie: ");
                const borcodes = readlineSync.question("Entre la bar code: ");
                const statu = readlineSync.question("Entre le status : ");
                await productModule.updateProduct(
                  productId,
                  nameProducts,
                  descriptions,
                  prices,
                  stocks,
                  categorys,
                  borcodes,
                  statu
                );
                console.log("update succe");
                break;
              case "4":
                idp = readlineSync.questionInt("Supprimer un produits: ");
                // console.log(idp);

                await productModule.destroyProduct(idp);
                break;
              default:
                console.log("Invalid option");
                break;
            }
            productChoice = productMenu();
          }
          break;

        case "3":
          let purchaseChoice = purchaseMenu();
          while (purchaseChoice !== "0") {
            switch (purchaseChoice) {
              case "1":
                const order = [];
                const orderDate = readlineSync.question(
                  "Entrez la date de commande (YYYY-MM-DD): "
                );
                const deliveryAddress = readlineSync.question(
                  "Entrez l'adresse de livraison: "
                );
                const customerId = readlineSync.questionInt(
                  "Entrez l'ID du client: "
                );
                const trackNumber = readlineSync.question(
                  "Entrez le numéro de suivi: "
                );
                const orderStatus = readlineSync.question(
                  "Entrez le statut de la commande: "
                );
                order.push({
                  orderDate,
                  deliveryAddress,
                  customerId,
                  trackNumber,
                  orderStatus,
                });
                const orderDetail = [];

                let add = true;

                while (add) {
                  const choix = detailMenu();

                  switch (choix) {
                    case "1":
                      const quantity = readlineSync.questionInt(
                        "Entrez une quantité: "
                      );
                      const price =
                        readlineSync.questionFloat("Entrez le prix: ");
                      const produit_id = readlineSync.questionInt(
                        "Entrez l'ID du produit: "
                      );
                      const order_id = readlineSync.questionInt(
                        "Entrez l'ID de la commande: "
                      );

                      orderDetail.push({
                        quantity,
                        price,
                        produit_id,
                        order_id,
                      });
                      break;

                    case "2":
                      const orderId = await orderModule.addOrder(
                        orderDate,
                        deliveryAddress,
                        customerId,
                        trackNumber,
                        orderStatus
                      );
                      console.log(`Commande d'achat ajoutée avec l'ID: ${orderId}`);

                      for (let i = 0; i < orderDetail.length; i++) {
                        const detail = orderDetail[i];
                        await orderModule.addOrderDetails(
                          detail.quantity,
                          detail.price,
                          detail.produit_id,
                          detail.order_id
                        );
                      }
                      console.log("Les commandes ont été enregistrées.");
                      add = false;
                      break;

                    case "3":
                      console.log("Vous avez quitté sans sauvegarder.");
                      add = false;
                      break;

                    default:
                      console.log("Option invalide, veuillez réessayer.");
                      break;
                  }
                }
                break;
              case "2":
                const updateOrderId = readlineSync.questionInt(
                  "Entrez l'ID de la commande d'achat à mettre à jour: "
                );
                const newOrderDate = readlineSync.question(
                  "Entrez la nouvelle date de commande (YYYY-MM-DD): "
                );
                const newDeliveryAddress = readlineSync.question(
                  "Entrez la nouvelle adresse de livraison: "
                );
                const newCustomerId = readlineSync.questionInt(
                  "Entrez le nouvel ID du client: "
                );
                const newTrackNumber = readlineSync.question(
                  "Entrez le nouveau numéro de suivi: "
                );
                const newOrderStatus = readlineSync.question(
                  "Entrez le nouveau statut de la commande: "
                );
                const updateOrderResult = await orderModule.updateOrder(
                  updateOrderId,
                  newOrderDate,
                  newDeliveryAddress,
                  newCustomerId,
                  newTrackNumber,
                  newOrderStatus
                );
                console.log(`Number of rows updated: ${updateOrderResult}`);
                break;
              case "3":

                const orderid = readlineSync.questionInt(
                  "Entrez l'id du commande a lister: "
                );
                const listId = await orderModule.getOrderById(orderid);
                console.table(listId);

                break;
                case "4":
                  const deOorderid = readlineSync.questionInt(
                    "Entrez l'id du commande a supprimer: "
                  );
                   await orderModule.destroyOrder(deOorderid);
                  break;
              default:
                console.log("Option invalide");
                break;
            }
            purchaseChoice = purchaseMenu();
          }
          break;

        case "4":
          let paymentChoice = paymentMenu();
          while (paymentChoice !== "0") {
            switch (paymentChoice) {
              case "1":
                const paymentDate = readlineSync.question(
                  "Entrez la date de paiement (YYYY-MM-DD): "
                );
                const amount = readlineSync.questionFloat("Entrez le montant: ");
                const paymentMethod = readlineSync.question(
                  "Entrez le mode de paiement: "
                );
                const paymentOrderId = readlineSync.questionInt(
                  "Entrez l'ID de la commande: "
                );
                const paymentId = await paymentModule.addPayment(
                  paymentDate,
                  amount,
                  paymentMethod,
                  paymentOrderId
                );
                console.log(`Paiement ajouté avec l'ID: ${paymentId}`);
                break;
              case "2":
                const payments = await paymentModule.get();
                console.log("Liste des paiements:");
                console.log(payments);
                break;
              case "3":
                const updatePaymentId = readlineSync.questionInt(
                  "Entrez l'ID du paiement à mettre à jour: "
                );
                const newPaymentDate = readlineSync.question(
                  "Entrez la nouvelle date de paiement (YYYY-MM-DD): "
                );
                const newAmount = readlineSync.questionFloat(
                  "Entrez le nouveau montant: "
                );
                const newPaymentMethod = readlineSync.question(
                  "Entrez le nouveau mode de paiement: "
                );
                const newOrderId = readlineSync.questionInt(
                  "Entrez le nouvel ID de la commande: "
                );
                const updatePaymentResult = await paymentModule.updatePayment(
                  updatePaymentId,
                  newPaymentDate,
                  newAmount,
                  newPaymentMethod,
                  newOrderId
                );
                console.log(`Nombre de lignes mises à jour: ${updatePaymentResult}`);
                break;
              case "4":
                const deletePaymentId = readlineSync.questionInt(
                  "Entrez l'ID du paiement à supprimer: "
                );
                const deletePaymentResult = await paymentModule.destroyPayment(
                  deletePaymentId
                );
                console.log(`Nombre de lignes supprimées: ${deletePaymentResult}`);
                break;
              default:
                console.log("Option invalide");
                break;
            }
            paymentChoice = paymentMenu();
          }
          break;

        default:
          console.log("Option invalide");
          break;
      }
      mainChoice = mainMenu();
    }
    console.log("Fermeture...");
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

main();
