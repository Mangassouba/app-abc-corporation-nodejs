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

    const [idOrder] = await connection.execute(
      "SELECT id FROM purchase_orders  WHERE id = ?",
      [order_id]
    );

    if (idOrder.length == 0) {
      console.log(
        "Vous ne pouvez pas attribuer un paiement à une commande qui n'existe pas."
      );
    }else{
      const [result] = await connection.execute(
        "INSERT INTO payments (date, amount, payment_method, order_id) values (?, ?, ?, ?)",
        [date, amount, payment_method, order_id]
      );
      
      console.log(`Paiement ajouté avec l'ID: ${result.insertId}`);
    }
   
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
    const [idOrder] = await connection.execute(
      "SELECT COUNT(*) AS count FROM purchase_orders WHERE id = ?",
      [order_id]
    );
    
    if (rows.length === 0) {
      console.log(`La mise a jour de paiement avec l'ID ${id} n'existe pas`);
    }else if(idOrder.length == 0){
      console.log("Vous ne pouvez pas associer un paiement à une commande inexistante.")
    }else{
      const [result] = await connection.execute(
        "UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?",
        [date, amount, payment_method, order_id, id]
      );
      return result.affectedRows;
    }

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
      console.log(`Le paiement avec l'ID ${id} n'existe pas`);
    }

    const [result] = await connection.execute(
      "DELETE FROM payments WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    throw error.message;
  } finally {
    connection.release();
  }
}
module.exports = { get, addPayment, updatePayment, destroyPayment };
