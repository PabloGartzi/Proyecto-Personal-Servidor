const {Client} = require('pg');

const connection = async () => {
    const client = new Client({
        connectionString: process.env.CONNECTION_CHAIN, 
    });
    try {
        await client.connect();
        console.log("Conectado a PostgreSQL correctamente");
        return client;

    } catch (error) {
        console.error("Error al conectar con PostgreSQL", error);
        return error
    } finally{
        console.log('Matando el servidor')
    }
};
module.exports = {connection};
