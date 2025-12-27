const officeQuerys = {
    getDate: `SELECT NOW();`,
    getAllWorks: `SELECT j.*, u.user_name AS worker_name 
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_id = u.user_id 
        ORDER BY j.job_created_at DESC;`,
    getWorkByID: `SELECT j.*, u.user_email AS worker_email 
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_id = u.user_id 
        WHERE j.job_id = $1;`,
    createWork: `INSERT INTO jobs (job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_id) 
            VALUES (TRIM($1),TRIM($2),$3,TRIM($4),$5,$6,$7) 
            RETURNING *;`,
    updateWork: `UPDATE jobs SET 
        job_title = COALESCE(TRIM($2), job_title), 
        job_description = COALESCE(TRIM($3), job_description), 
        job_status = COALESCE($4, job_status), 
        job_address = COALESCE(TRIM($5), job_address), 
        job_latitude = COALESCE($6, job_latitude), 
        job_longitude = COALESCE($7, job_longitude), 
        assigned_worker_user_id = COALESCE($8, assigned_worker_user_id) 
        WHERE job_id = $1 RETURNING *;`,
    deleteWork: `DELETE FROM jobs 
        WHERE job_id = $1 RETURNING *;`,
    findWorkByTitle: `SELECT * FROM jobs WHERE job_title ILIKE $1;`,
    findWorkerIDByEmail: `SELECT user_id 
        FROM users 
        WHERE user_email LIKE '%' || TRIM($1) || '%'
        AND role_id = 3;`
};

module.exports = { 
    officeQuerys 
};
