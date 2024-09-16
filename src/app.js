const customerModule = require("./customerModule");
const productModule = require("./productModule");
const orderModule = require("./orderModule");
const paymentModule = require("./paymentModule");
const readlineSync = require("readline-sync");
const pool = require("./db");

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
  console.log("3. Lister la commande d'achat et ses details");
  console.log("4. Supprimer la commande d'achat");
  console.log("5. Lister la commande d'achat");
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
  console.log("1. Ajouter une detail commande");
  console.log("2. Sauvegarder les commandes et quitter");
  console.log("3. Quitter sans sauvegarder");
  const choice = readlineSync.question("Votre choix: ");
  return choice;
}

async function main() {
  try {
    let connection = await pool.getConnection();
    let mainChoice = mainMenu();
    while (mainChoice !== "0") {
      switch (mainChoice) {
        case "1":
          let customerChoice = customerMenu();
          while (customerChoice !== "0") {
            switch (customerChoice) {
              case "1":
                const name = readlineSync.question("Entrez le nom : ");
                const address = readlineSync.question(
                  "Entrez votre address : "
                );
                const email = readlineSync.question("Entrez votre email : ");
                const phone = readlineSync.question(
                  "Entre votre numero de telephone : "
                );
                await customerModule.addCustomer(name, address, email, phone);
                break;
              case "2":
                const list = await customerModule.get();
                console.log(list);
                break;
              case "3":
                const id = readlineSync.questionInt("Entrez id : ");
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
                break;
              case "4":
                const deleteId = readlineSync.questionInt(
                  "Entrez l'id du client à supprimer: "
                );
                const deleteResult = await customerModule.destroyCustomer(
                  deleteId
                );
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
                const borcode = readlineSync.question("Entre la barcode: ");
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
                const borcodes = readlineSync.question("Entre la barcode: ");
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

                break;
              case "4":
                idp = readlineSync.questionInt("Supprimer un produits: ");

                await productModule.destroyProduct(idp);
                break;
              default:
                console.log("option invalide");
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
                let orderId;
                let orderDate = readlineSync.question(
                  "Entrez la date de commande (YYYY-MM-DD): "
                );
                while (orderDate == "") {
                  console.log("Veuillez entrer la date de la commande.");
                  orderDate = readlineSync.question("Entrez la date de commande (YYYY-MM-DD): ");
                }
                let deliveryAddress = readlineSync.question(
                  "Entrez l'adresse de livraison: "
                );
                while (deliveryAddress == "") {
                  console.log("Veuillez entrer l'adresse de la commande.");
                  deliveryAddress = readlineSync.question(
                    "Entrez l'adresse de livraison:: "
                  );
                }
                let customerId = readlineSync.questionInt(
                  "Entrez l'ID du client: "
                );
                // let connection = await pool.getConnection();
                let [rows] = await connection.execute(
                  "SELECT * FROM customers WHERE id = ?",
                  [customerId]
                );
                while (rows.length == 0) {
                  console.log(
                    "L'ID que vous avez entré ne correspond à aucun client. "
                  );
                  customerId = readlineSync.questionInt("Enter  customer id: ");
                  [rows] = await connection.execute(
                    "SELECT * FROM customers WHERE id = ?",
                    [customerId]
                  );
                }

                let trackNumber = readlineSync.question(
                  "Entrez le numero de suivi: "
                );
                // let [rowsTrackNumber] = await connection.execute(
                //   "SELECT * FROM purchase_orders WHERE track_number = ?",
                //   [trackNumber]
                // );
                // while (rowsTrackNumber.length == 0) {
                //   console.log("Veuillez entrer le numéro de suivi de la commande.");
                //   trackNumber = readlineSync.question("Entrez le numéro de suivi: ");
                //   [rowsTrackNumber] = await connection.execute(
                //     "SELECT * FROM purchase_orders WHERE track_number = ?",
                //     [trackNumber]
                //   );
                // }
                let orderStatus = readlineSync.question(
                  "Entrez le statut de la commande: "
                );
                while (orderStatus == "") {
                  console.log("Veuillez entrer le statut de la commande.");
                  orderStatus = readlineSync.question("Entrez le statut de la commande: ");
                }
                const orderDetail = [];

                let add = true;

                while (add) {
                  const choix = detailMenu();

                  switch (choix) {
                    case "1":
                      let produit_id = readlineSync.questionInt(
                        "Entrez l'ID du produit: "
                      );
                      let [rows] = await connection.execute(
                        "SELECT * FROM products WHERE id = ?",
                        [produit_id]
                      );

                      while (rows.length == 0) {
                        console.log("L'ID que vous avez entré ne correspond à aucun produit.");
                        produit_id = readlineSync.questionInt("Entrez l'ID du produit: ");
                        [rows] = await connection.execute(
                          "SELECT * FROM products WHERE id = ?",
                          [produit_id]
                        );
                      }
                      const quantity = readlineSync.questionInt(
                        "Entrez une quantité: "
                      );
                      const price =
                        readlineSync.questionFloat("Entrez le prix: ");

                      orderDetail.push({
                        quantity,
                        price,
                        produit_id,
                      });
                      break;

                    case "2":
                      orderId = await orderModule.addOrder(
                        orderDate,
                        deliveryAddress,
                        customerId,
                        trackNumber,
                        orderStatus
                      );
                      console.log(
                        `Commande d'achat ajoutée avec l'ID: ${orderId}`
                      );

                      for (let i = 0; i < orderDetail.length; i++) {
                        const detail = orderDetail[i];
                        await orderModule.addOrderDetails(
                          detail.quantity,
                          detail.price,
                          detail.produit_id,
                          orderId
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
                let newUpdateOrderId = readlineSync.questionInt(
                  "Entrez l'ID de la commande d'achat à mettre à jour: "
                );
                // let connection = await pool.getConnection();
                let [rowss] = await connection.execute(
                  "SELECT * FROM purchase_orders WHERE id = ?",
                  [newUpdateOrderId]
                );
                while (rowss.length == 0) {
                  console.log("L'ID que vous avez entré ne correspond à aucune commande");
                  newUpdateOrderId = readlineSync.questionInt("Entrez l'ID de la commande: ");
                  [rowss] = await connection.execute(
                    "SELECT * FROM purchase_orders WHERE id = ?",
                    [newUpdateOrderId]
                  );
                }
                let newOrderDate = readlineSync.question(
                  "Entrez la date de commande (YYYY-MM-DD): "
                );
                while (newOrderDate == "") {
                  console.log("Veuillez entrer la date de la commande.");
                  newOrderDate = readlineSync.question("Entrez la date de commande (YYYY-MM-DD): ");
                }
                let newDeliveryAddress = readlineSync.question(
                  "Entrez l'adresse de livraison: "
                );
                while (newDeliveryAddress == "") {
                  console.log("Veuillez entrer l'adresse de la commande.");
                  newDeliveryAddress = readlineSync.question(
                    "Entrez l'adresse de livraison:: "
                  );
                }
                let newCustomerId = readlineSync.questionInt(
                  "Entrez l'ID du client: "
                );
                // let connection = await pool.getConnection();
                let [row] = await connection.execute(
                  "SELECT * FROM customers WHERE id = ?",
                  [newCustomerId]
                );
                while (row.length == 0) {
                  console.log(
                    "L'ID que vous avez entré ne correspond à aucun client. "
                  );
                  newCustomerId = readlineSync.questionInt("Enter  customer id: ");
                  [row] = await connection.execute(
                    "SELECT * FROM customers WHERE id = ?",
                    [newCustomerId]
                  );
                }

                let newTrackNumber = readlineSync.question(
                  "Entrez le numero de suivi: "
                );
                let [rowTrackNumber] = await connection.execute(
                  "SELECT * FROM purchase_orders WHERE track_number = ?",
                  [newTrackNumber]
                );
                while (rowTrackNumber.length === 0) {
                  console.log("Veuillez entrer le numéro de suivi de la commande.");
                  newTrackNumber = readlineSync.question("Entrez le numéro de suivi: ");
                  [rowTrackNumber] = await connection.execute(
                    "SELECT * FROM purchase_orders WHERE track_number = ?",
                    [newTrackNumber]
                  );
                }
                let newOrderStatus = readlineSync.question(
                  "Entrez le statut de la commande: "
                );
                while (newOrderStatus == "") {
                  console.log("Veuillez entrer le statut de la commande.");
                  newOrderStatus = readlineSync.question("Entrez le statut de la commande: ");
                }
                const updateOrderResult = await orderModule.updateOrder(
                  newUpdateOrderId,
                  newOrderDate,
                  newDeliveryAddress,
                  newCustomerId,
                  newTrackNumber,
                  newOrderStatus
                );
                console.log(`Number of rows updated: ${updateOrderResult}`);

                const [currentDetails] =
                  await orderModule.getOrderDetailsByOrderId(newUpdateOrderId);
                console.table(currentDetails);

                let modifyDetails = readlineSync.question(
                  "Souhaitez-vous modifier les détails de la commande? (y/n): "
                );

                if (modifyDetails.toLowerCase() === "y") {
                  for (let i = 0; i < currentDetails.length; i++) {
                    const detail = currentDetails[i];
                    console.log(
                      `Modification du détail de la commande ID: ${detail.id}`
                    );

                    const newQuantity =
                      readlineSync.questionInt(
                        `Quantité actuelle (${detail.quantity}): Entrez une nouvelle quantite ou appuyez sur Entree pour garder la même: `
                      ) || detail.quantity;

                    const newPrice =
                      readlineSync.questionFloat(
                        `Prix actuel (${detail.price}): Entrez un nouveau prix ou appuyez sur Entrée pour garder le même: `
                      ) || detail.price;

                    await orderModule.updateOrderDetail(
                      detail.id,
                      newQuantity,
                      newPrice
                    );
                    console.log(
                      `Détail de commande ID ${detail.id} mis à jour.`
                    );
                  }
                }
                break;
              case "3":
                const orderid = readlineSync.questionInt(
                  "Entrez l'id du commande a lister: "
                );
                const listId = await orderModule.getOrderById(orderid);
                // console.table(listId);

                break;
              case "4":
                const deOorderid = readlineSync.questionInt(
                  "Entrez l'id du commande a supprimer: "
                );
                await orderModule.destroyOrder(deOorderid);
                break;
              case "5":
                await orderModule.getOrder();
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
                let paymentDate = readlineSync.question(
                  "Entrez la date de paiement (YYYY-MM-DD): "
                );
                while (paymentDate == "") {
                  console.log("Veuillez Entrez la date du paiement: ");
                  paymentDate = readlineSync.question("Entrez la date de paiement (YYYY-MM-DD): ");
                }
                const amount = readlineSync.questionFloat(
                  "Entrez le montant: "
                );
                const paymentMethod = readlineSync.question(
                  "Entrez le mode de paiement: "
                );
                let paymentOrderId = readlineSync.questionInt(
                  "Entrez l'ID de la commande: "
                );
                let [rowsOrderId] = await connection.execute(
                  "SELECT * FROM purchase_orders WHERE id = ?",
                  [paymentOrderId]
                );
                while (rowsOrderId.length == 0) {
                  console.log("L'identifiant que vous avez saisi ne correspond à aucune commande");
                  orderId = readlineSync.questionInt("Entrez l'ID de la commande: ");
                  [rowsOrderId] = await connection.execute(
                    "SELECT * FROM purchase_orders WHERE id = ?",
                    [orderId]
                  );
                }
      
                const paymentId = await paymentModule.addPayment(
                  paymentDate,
                  amount,
                  paymentMethod,
                  paymentOrderId
                );
                break;
              case "2":
                const payments = await paymentModule.get();
                console.log("Liste des paiements:");
                console.log(payments);
                break;
              case "3":
                let updatePaymentId = readlineSync.questionInt(
                  "Entrez l'ID du paiement à mettre à jour: "
                );
                let [rows] = await connection.execute(
                  "SELECT * FROM payments WHERE id = ?",
                  [updatePaymentId]
                );
                while (rows.length == 0) {
                  console.log("L'identifiant que vous avez saisi ne correspond à aucun paiement.");
                  updatePaymentId = readlineSync.questionInt("Entrez l'ID de paiement : ");
                  [rows] = await connection.execute(
                    "SELECT * FROM payments WHERE id = ?",
                    [updatePaymentId]
                  );
                }
                const newPaymentDate = readlineSync.question(
                  "Entrez la nouvelle date de paiement (YYYY-MM-DD): "
                );
                const newAmount = readlineSync.questionFloat(
                  "Entrez le nouveau montant: "
                );
                let newPaymentMethod = readlineSync.question(
                  "Entrez le nouveau mode de paiement: "
                );
                while (newPaymentMethod == "") {
                  console.log("Veuillez saisir le mode de paiement.");
                  newPaymentMethod = readlineSync.question("Entrez le mode de paiement: ");
                }
                let newOrderId = readlineSync.questionInt(
                  "Entrez le nouvel ID de la commande: "
                );
                let [NewRowsOrderId] = await connection.execute(
                  "SELECT * FROM purchase_orders  WHERE id = ?",
                  [newOrderId]
                );
                while (NewRowsOrderId.length == 0) {
                  console.log("L'identifiant que vous avez saisi ne correspond à aucune commande.");
                  newOrderId = readlineSync.questionInt("Entrez le numéro de commande: ");
                  [NewRowsOrderId] = await connection.execute(
                    "SELECT * FROM purchase_orders  WHERE id = ?",
                    [newOrderId]
                  );
                }
                const updatePaymentResult = await paymentModule.updatePayment(
                  updatePaymentId,
                  newPaymentDate,
                  newAmount,
                  newPaymentMethod,
                  newOrderId
                );
                console.log(
                  `Nombre de lignes mises à jour: ${updatePaymentResult}`
                );
                break;
              case "4":
                const deletePaymentId = readlineSync.questionInt(
                  "Entrez l'ID du paiement à supprimer: "
                );
                const deletePaymentResult = await paymentModule.destroyPayment(
                  deletePaymentId
                );
                console.log(
                  `Nombre de lignes supprimées: ${deletePaymentResult}`
                );
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
