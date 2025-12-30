const {connection} = require('../config/dbConnect'); 
const { getRoleIdByName } = require('../helpers/getRoleIdByName');
const {adminQuerys} = require("./admin.querys");
const bcrypt = require("bcryptjs");


const getAllUsers = async () => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.getAllUsers)
    return result.rows;
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}

const getUserByID = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.getUserByID, [id])
    return result.rows[0];
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    console.log("<==============FINAL=============>")
  }
}

const createUser = async (userInfo) => {
  const {user_name, user_email, password, role} = userInfo;
  let client, result;
  try {
    const role_id = getRoleIdByName(role);
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    client = await connection();
    result = await client.query(adminQuerys.createUser, [user_name, user_email, password_hash, role_id]);
    
    return result.rows;
  } catch (error) {
    console.log("Error al agregar usuario:", error);
    return error;
  } finally {
    await client.end();
  }
};

const updateUser = async (id, userInfo) => {
  const {user_name, user_email, password, role} = userInfo;
  let client, result, password_hash;
  try {
    const role_id = role ? getRoleIdByName(role) : null;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      password_hash = bcrypt.hashSync(password, salt);
    } else {
      password_hash = null; // para que la query no la toque
    }

    client = await connection();
    result = await client.query(adminQuerys.updateUser, [id, user_name, user_email, password_hash, role_id]);
    return result.rows[0];
  } catch (error) {
    console.log("Error al editar usuario:", error);
    throw error;
  } finally {
    await client.end();
  }
};

const deleteUser = async (id) => {
  let client, result;
  try {
    client = await connection();
    result = await client.query(adminQuerys.deleteUser, [id]
    );
    return result.rows[0]; // Devolvemos un solo objeto
  } catch (error) {
    console.log("Error al eliminar usuario:", error);
    return error;
  } finally {
    await client.end();
  }
};

const findUserByEmail = async (email) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.findUserByEmail, [email])
    return result.rows[0] || null;
  } catch (error) {
    console.log("Error al buscar usuario por nombre:", error);
    return error;
  } finally{
    await client.end()
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}
const totalUsers = async () => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.totalUsers)
    return result.rows[0] || null;
  } catch (error) {
    console.log("Error al buscar total de usuarios:", error);
    return error;
  } finally{
    await client.end()
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}
const usersByRole = async () => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.usersByRole)
    return result.rows;
  } catch (error) {
    console.log("Error al buscar usuarios por rol:", error);
    return error;
  } finally{
    await client.end()
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}

module.exports= {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    findUserByEmail,
    totalUsers,
    usersByRole
}