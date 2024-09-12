const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM payments");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function addPayment(date, amount, payment_method, order_id) {
  const connection = await pool.getConnection();
  
  console.log("ajoute client")
  try {
    const [result] = await connection.execute(
      "INSERT INTO payments (date, amount, payment_method, order_id) values (?, ?, ?, ?)",
      [date, amount, payment_method, order_id]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function updatePayment(id,date, amount, payment_method, order_id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM payments WHERE id = ?",
      [id]
    );
    
    if (rows.length === 0) {
      throw new Error(`Le paiement avec l'ID ${id} n'existe pas`);
    }

    const [result] = await connection.execute(
      "UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?",
      [date, amount, payment_method, order_id, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function destroyPayment(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM payments WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`Le paiement avec l'ID ${id} n'existe pas`);
    }

    const [result] = await connection.execute(
      "DELETE FROM payments WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(`Deletion error ${id}`);
    }
    throw error;
  } finally {
    connection.release();
  }
}
module.exports = { get, addPayment, updatePayment, destroyPayment };
