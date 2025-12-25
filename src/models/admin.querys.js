const adminQuerys = {
    getDate: `SELECT NOW()`, 
    getAllUsers: `SELECT * FROM users AS u INNER JOIN roles AS r on u.role_id = r.role_id;`,
    getUserByID: `SELECT * FROM users AS u INNER JOIN roles AS r on u.role_id = r.role_id WHERE user_id = $1;`,
    createUser: `INSERT INTO users (user_name, user_email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
    updateUser: `UPDATE users SET
    user_name = COALESCE($2, user_name),
    user_email = COALESCE($3, user_email),
    password_hash = COALESCE($4, password_hash),
    role_id = COALESCE($5, role_id)
    WHERE user_id = $1
    RETURNING *;`,
    deleteUser: `DELETE FROM users WHERE user_id = $1 RETURNING *;`,
    findUserByEmail: `SELECT * FROM users WHERE user_name = $1`,
}

module.exports = {
    adminQuerys
}