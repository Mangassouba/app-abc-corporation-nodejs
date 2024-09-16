const pool = require("./db");

async function addOrder(
  date,
  delivery_address,
  customer_id,
  track_number,
  status
) {
  const connection = await pool.getConnection();
  try {
   
    const [idCustomer] = await connection.execute(
      "SELECT COUNT(*) AS count FROM customers WHERE id = ?",
      [customer_id]
    );
    
    if (idCustomer[0].count == 0) {
      console.log(
        "Vous ne pouvez pas associer une commande à un client qui n'existe pas"
      );
    } else {
      const [orderId] = await connection.execute(
        "INSERT INTO purchase_orders (date, delivery_address , customer_id , track_number,status) VALUES (?, ?, ?, ?, ?)",
        [date, delivery_address, customer_id, track_number, status]
      );
      return orderId.insertId;
    }
   
  } catch (error) {
    console.log("erreur d'insertion", error.message);
  } finally{
    connection.release();
  }
}

async function addOrderDetails(quantity, price, product_id, order_id) {
  const connection = await pool.getConnection();
  try {
    const [idProduct] = await connection.execute(
      "SELECT COUNT(*) AS count FROM products WHERE id = ?",
      [product_id]
    );
    if (idProduct[0].count == 0) {
      console.log(
        "\nYou cannot associate an order with a customer that does not exist\n"
      );
    } else{
      const result = await connection.execute(
        "INSERT INTO order_details (quantity,price,product_id,order_id) VALUES (?, ?, ?, ?)",
        [quantity, price, product_id, order_id]
      );
      return result;
    }
   
  } catch (error) {
    throw error.message;
  } finally {
    connection.release();
  }
}

async function updateOrder(
  id,
  date,
  delivery_address,
  customer_id,
  track_number,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM purchase_orders WHERE id = ?",
      [id]
    );
   
    if (rows.length === 0) {
      console.log(`La commande avec l'ID ${id} n'existe pas`);
    }
    else {
      const result = await connection.execute(
        "UPDATE purchase_orders SET date = ?, delivery_address = ? , customer_id = ? , track_number = ?, status = ? WHERE id = ?",
        [date, delivery_address, customer_id, track_number, status, id]
      );
      return result;
    }

    
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}


async function getOrder() {
  const connection = await pool.getConnection();
  const [result] = await connection.execute(
      "SELECT * FROM purchase_orders"
  );
  console.table(result); 
}

async function updateOrderDetail(detailId, quantity, price) {
  const connection = await pool.getConnection();
  const result = await connection.execute(
      "UPDATE order_details SET quantity = ?, price = ? WHERE id = ?",
      [quantity, price, detailId]
  );
  return result.affectedRows;
}

async function getOrderDetailsByOrderId(orderId) {
  const connection = await pool.getConnection();
  const result = await connection.execute(
      "SELECT * FROM order_details WHERE order_id = ?",
      [orderId]
  );
  return result; 
}

async function getOrderById(id) {
  const connection = await pool.getConnection();
  try {
    const [rowsOrder] = await connection.execute(
      "SELECT * FROM purchase_orders WHERE id = ?",
      [id]
    );
    const [rowsDetails] = await connection.execute(
      "SELECT * FROM order_details WHERE order_id = ?",
      [id]
    );
    if(rowsOrder.length ===0){
      console.log(`La commande avec id ${id} n'existe pas`);
    }else{
      console.table(rowsOrder) ;
      console.table(rowsDetails) ;
    }
  } catch (error) {
    throw error.message;
  }finally{
    connection.release();
  }
}

async function destroyOrder(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM purchase_orders WHERE id = ?",
      [id]
    );
    const [rowsPayment] = await connection.execute("SELECT * FROM payments WHERE order_id = ?",[id]);

    if (rows.length === 0) {
      console.log(`La commande avec l'ID ${id} n'existe pas`);
    }else if(rowsPayment.length !== 0){
      console.log("Vous ne pouvez pas supprimer une commande déja payer")
    }else{
      const result = await connection.execute(
        "DELETE FROM purchase_orders WHERE id = ?",
        [id]
      );
      return result;
    }
   
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updateOrderDetails(quantity, price, produit_id, order_id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM order_details WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log(`La commande avec l'ID ${id} n'existe pas`);
    }
    const result = await connection.execute(
      "UPDATE order_details  SET  quantity = ?,price,produit_id = ?,order_id = ? WHERE id = ?",
      [quantity, price, produit_id, order_id, id]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}



module.exports = {
  addOrderDetails,
  addOrder,
  updateOrder,
  destroyOrder,
  updateOrderDetails,
  getOrderById,
  getOrder,
  updateOrderDetail,
  getOrderDetailsByOrderId
};
