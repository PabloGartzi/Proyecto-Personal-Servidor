const authQuerys = {
    findOne: `SELECT *
    FROM users AS u INNER JOIN roles AS r on u.role_id = r.role_id
    WHERE user_email = $1`
}

module.exports = {
    authQuerys
}