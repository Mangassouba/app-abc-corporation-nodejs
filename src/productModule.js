const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    // connection.release();
  }
}

async function addProduct(
  name,
  description,
  price,
  stock,
  category,
  barcode,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO products (name,description,price,stock,category,barcode,status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category, barcode, status]
    );
    return result.insertId;
  } catch (error) {}
}

async function updateProduct(
  id,
  name,
  description,
  price,
  stock,
  category,
  barcode,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log(`Le produit avec l'ID ${id} n'existe pas`);
    } else {
      const [result] = await connection.execute(
        "UPDATE products SET name=?,description=?,price=?,stock=?,category=?,barcode=?,status=? where id = ?",
        [name, description, price, stock, category, barcode, status, id]
      );
      console.log("mis a jours");

      return result.insertId;
    }
  } catch (error) {}
}

async function destroyProduct(id) {
  const connection = await pool.getConnection();
  // console.log(id,connection);

  try {
    const [rows] = await connection.execute(
      "SELECT id FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log(`Le produit avec l'ID ${id} n'existe pas`);
    } else {
      const result = await connection.execute(
        "DELETE FROM products where id = ?",
        [id]
      );
      console.log("produit supprimer");
      return result;
    }
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      console.log(`Erreur de suppression ${id}`);
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, addProduct, updateProduct, destroyProduct };
