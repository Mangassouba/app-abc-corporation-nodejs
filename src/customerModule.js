const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM customers");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function addCustomer(name, address, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO customers (name,address,email,phone) VALUES (?, ?, ?, ?)",
      [name, address, email, phone]
    );
    return result.insertId;
  } catch (error) {}
}

async function updateCustomer(id, name, address, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM customers WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log(`Le client avec l'ID ${id} n'existe pas`);
    }
    const [result] = await connection.execute(
      "UPDATE customers SET name=?,address=?,email=?,phone=?, where id = ?",
      [name, address, email, phone, id]
    );
    console.log("mis a jours");

    return result.insertId;
  } catch (error) {}
}

async function destroyCustomer(id) {
  const connection = await pool.getConnection();
  // console.log(id,connection);

  try {
    const [rows] = await connection.execute(
      "SELECT id FROM customers WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log(`Le client avec l'ID ${id} n'existe pas`);
    }

    const result = await connection.execute(
      "DELETE FROM customers where id = ?",
      [id]
    );
    console.log("custpmers supprimer");
    return result;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(`Deletion error ${id}`);
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, addCustomer, updateCustomer, destroyCustomer };
