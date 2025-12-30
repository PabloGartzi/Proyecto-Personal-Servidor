const adminQuerys = {
    getDate: `SELECT NOW()`, 
    getAllUsers: `SELECT * FROM users AS u INNER JOIN roles AS r on u.role_id = r.role_id;`,
    getUserByID: `SELECT * FROM users AS u INNER JOIN roles AS r on u.role_id = r.role_id WHERE user_id = $1;`,
    createUser: `INSERT INTO users (user_name, user_email, password_hash, role_id) VALUES (TRIM($1), TRIM($2), $3, $4) RETURNING *;`,
    updateUser: `UPDATE users SET
    user_name = COALESCE(TRIM($2), user_name),
    user_email = COALESCE(TRIM($3), user_email),
    password_hash = COALESCE($4, password_hash),
    role_id = COALESCE($5, role_id)
    WHERE user_id = $1
    RETURNING *;`,
    deleteUser: `DELETE FROM users WHERE user_id = $1 RETURNING *;`,
    findUserByEmail: `SELECT * FROM users WHERE user_email = $1;`,
    totalUsers: `SELECT COUNT(*) AS total_users FROM users;`,
    usersByRole: `SELECT r.role_id, r.role_name, COUNT(u.user_id) AS total_users
    FROM roles AS r LEFT JOIN users AS u ON u.role_id = r.role_id
    GROUP BY r.role_id, r.role_name
    ORDER BY r.role_id;`
}

module.exports = {
    adminQuerys
}