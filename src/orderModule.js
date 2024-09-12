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
    const result = await connection.execute(
      "INSERT INTO purchase_orders (date, delivery_address , customer_id , track_number,status) VALUES (?, ?, ?, ?, ?)",
      [date, delivery_address, customer_id, track_number, status]
    );
    return result;
  } catch (error) {
    throw error;
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
      throw new Error(`La commande avec l'ID ${id} n'existe pas`);
    }
    const result = await connection.execute(
      "UPDATE purchase_orders SET date = ?, delivery_address = ? , customer_id = ? , track_number = ?, status = ? WHERE id = ?",
      [date, delivery_address, customer_id, track_number, status, id]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getOrderById(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "SELECT * FROM purchase_orders INNER JOIN order_details ON purchase_orders.id = order_details.order_id WHERE purchase_orders.id = ?",
      [id]
    );
    return result;
  } catch (error) {}
}

async function destroyOrder(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM purchase_orders WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`La commande avec l'ID ${id} n'existe pas`);
    }
    const result = await connection.execute(
      "DELETE FROM purchase_orders WHERE id = ?",
      [id]
    );
    return result;
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
      throw new Error(`La commande avec l'ID ${id} n'existe pas`);
    }
    const result = await connection.execute(
      "UPDATE order_details  SET  quantity = ?,price,produit_id = ?,order_id = ? WHERE id = ?",
      [quantity, price, produit_id, order_id, id]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    // connection.release();
  }
}

async function addOrderDetails(quantity, price, produit_id, order_id) {
  const connection = await pool.getConnection();
  try {
    const result = await connection.execute(
      "INSERT INTO order_details (quantity,price,produit_id,order_id) VALUES (?, ?, ?, ?)",
      [quantity, price, produit_id, order_id]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    // connection.release();
  }
}

module.exports = {
  addOrderDetails,
  addOrder,
  updateOrder,
  destroyOrder,
  updateOrderDetails,
  getOrderById,
};
