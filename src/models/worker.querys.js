const workerQuerys = {
    getDate: `SELECT NOW();`,
    getAllWorks: `SELECT j.*
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_id = u.user_id
        WHERE j.assigned_worker_user_id = $1
        ORDER BY j.job_created_at DESC;`,
    getWorkByID: `SELECT j.*, u.user_email AS worker_email 
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_id = u.user_id 
        WHERE j.job_id = $1;`,
    updateWork: `UPDATE jobs SET 
        job_status = COALESCE($2, job_status)
        WHERE job_id = $1 RETURNING *;`,
    getAllReports: `SELECT *
        FROM reports
        WHERE job_id = $1`,
};

module.exports = { 
    workerQuerys 
};
