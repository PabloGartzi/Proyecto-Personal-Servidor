const workerQuerys = {
    getDate: `SELECT NOW();`,
    getAllWorks: `SELECT j.*
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_email = u.user_email
        WHERE u.user_id = $1
        ORDER BY j.job_created_at ASC;`,
    getWorkByID: `SELECT j.*, u.user_email AS worker_email 
        FROM jobs AS j INNER JOIN users AS u ON j.assigned_worker_user_email = u.user_email 
        WHERE j.job_id = $1;`,
    updateWork: `UPDATE jobs SET 
        job_status = COALESCE($2, job_status)
        WHERE job_id = $1 RETURNING *;`,
    getAllReports: `SELECT *
        FROM reports
        WHERE job_id = $1
        ORDER BY report_created_at ASC;`,
    createReport: `INSERT INTO reports (job_id, worker_user_id, report_notes, report_photo_url) VALUES ($1, $2, $3, $4) RETURNING *;`,
    deleteReport: `DELETE FROM reports 
        WHERE report_id = $1 RETURNING *;`,
    updateReport: `UPDATE reports SET 
        report_notes = COALESCE(TRIM($2), report_notes), 
        report_photo_url = COALESCE(TRIM($3), report_photo_url)
        WHERE report_id = $1 RETURNING *;`,
    getReportById: `SELECT *
        FROM reports
        WHERE report_id = $1;`,
};

module.exports = { 
    workerQuerys 
};
