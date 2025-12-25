const {connection} = require('../config/dbConnect') 
const {authQuerys} = require("./auth.querys");

const findOne = async (email) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(authQuerys.findOne, [email])
    return result.rows[0] || null;
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}

module.exports= {
  findOne,
}