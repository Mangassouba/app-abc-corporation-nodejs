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
    const [emailRows] = await connection.execute("SELECT email FROM customers WHERE email = ?",
      [email]
    );
    const [phoneRows] = await connection.execute("SELECT phone FROM customers WHERE phone = ?",
      [phone]
    );
    if (emailRows.length > 0 || phoneRows.length > 0) {
      console.log(
        "Vous ne pouvez pas attribuer une adresse e-mail ou un numéro de téléphone à deux clients différents"
      );
    }else{
      const [result] = await connection.execute(
        "INSERT INTO customers (name,address,email,phone) VALUES (?, ?, ?, ?)",
        [name, address, email, phone]
      );
      console.log("client ajouté avec succès !");
      return result.insertId;
    }
    
  } catch (error) {
    throw error.message;
  }finally{
    connection.release();
  }
}

async function updateCustomer(id, name, address, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM customers WHERE id = ?",
      [id]
    );
    const [emailRows] = await connection.execute("SELECT email FROM customers WHERE email = ?",
      [email]
    );
    const [phoneRows] = await connection.execute("SELECT phone FROM customers WHERE phone = ?",
      [phone]
    );

    if (rows.length === 0) {
      console.log(`Le client avec l'ID ${id} n'existe pas`);
    } else if (emailRows.length > 0 || phoneRows.length > 0) {
      console.log(
        "Vous ne pouvez pas attribuer une adresse e-mail ou un numéro de téléphone à deux clients différents"
      );
    }else {
      const [result] = await connection.execute(
        "UPDATE customers SET name=?,address=?,email=?,phone=? where id = ?",
        [name, address, email, phone, id]
      );
      console.log("mis a jours avec succés");
      
    return result.insertId;
    }
  } catch (error) {
    throw error.message;
  } finally {
    connection.release();
  }
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
    } else {
      const result = await connection.execute(
        "DELETE FROM customers where id = ?",
        [id]
      );
      console.log("Client supprimer");
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

module.exports = { get, addCustomer, updateCustomer, destroyCustomer };
