const alertsQuerys = {

  createAlert: `
    INSERT INTO alerts (
      sender_user_email,
      receiver_user_email,
      alert_title,
      alert_message,
      alert_type
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,

  getAlertsByUser: `
    SELECT *
    FROM alerts
    WHERE receiver_user_email = $1
    ORDER BY alert_created_at DESC;
  `,

  deleteAlert: `
    DELETE FROM alerts
    WHERE alert_id = $1 AND receiver_user_email = $2
    RETURNING *;
  `,

  getUserEmailByID: `
    SELECT user_email FROM users
    WHERE user_id = $1;
  ;`
};

module.exports = {
  alertsQuerys
};
