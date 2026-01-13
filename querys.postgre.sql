DROP TABLE IF EXISTS stock_usages CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;


CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(250) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(role_id),
    is_active BOOLEAN DEFAULT TRUE,
    user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    job_title VARCHAR(150) UNIQUE NOT NULL,
    job_description TEXT,
    job_status VARCHAR(20) DEFAULT 'pendiente',
    job_address TEXT,
    job_latitude DECIMAL(9,6),
    job_longitude DECIMAL(9,6),
    assigned_worker_user_id INT REFERENCES users(user_id),
    job_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE reports;
DROP TABLE stock_usages;
DROP TABLE jobs;


CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id) ON DELETE CASCADE,
    worker_user_id INT REFERENCES users(user_id),
    report_notes TEXT,
    report_photo_url TEXT,
    report_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_usages (
    stock_usage_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id) ON DELETE CASCADE,
    worker_user_id INT REFERENCES users(user_id),
    material_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    observations TEXT,
    stock_usage_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
SELECT * FROM jobs;
SELECT * FROM reports;
SELECT * FROM reports WHERE job_id = 10;

ALTER TABLE jobs
ADD COLUMN assigned_worker_user_email VARCHAR(150);

UPDATE jobs j
SET assigned_worker_user_email = u.user_email
FROM users u
WHERE j.assigned_worker_user_id = u.user_id;


ALTER TABLE jobs
DROP COLUMN assigned_worker_user_id;

CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    sender_user_email VARCHAR(150) NOT NULL REFERENCES users(user_email) ON DELETE CASCADE,
    receiver_user_email VARCHAR(150) NOT NULL REFERENCES users(user_email) ON DELETE CASCADE,
    alert_title VARCHAR(150) NOT NULL,
    alert_message TEXT NOT NULL,
    alert_type VARCHAR(30) DEFAULT 'info',
    alert_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM alerts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 
ALTER TABLE users
ADD COLUMN user_uuid UUID;

UPDATE users
SET user_uuid = uuid_generate_v4()
WHERE user_uuid IS NULL;

SELECT user_id, user_name, user_uuid FROM users;

ALTER TABLE users
ALTER COLUMN user_uuid SET NOT NULL;

ALTER TABLE users
ADD CONSTRAINT users_user_uuid_unique UNIQUE (user_uuid);

ALTER TABLE users
ALTER COLUMN user_uuid
SET DEFAULT uuid_generate_v4();

--  

ALTER TABLE jobs
ADD COLUMN job_uuid UUID;

UPDATE jobs
SET job_uuid = uuid_generate_v4()
WHERE job_uuid IS NULL;

ALTER TABLE jobs
ALTER COLUMN job_uuid SET NOT NULL;

ALTER TABLE jobs
ADD CONSTRAINT jobs_job_uuid_unique UNIQUE (job_uuid);

ALTER TABLE jobs
ALTER COLUMN job_uuid
SET DEFAULT uuid_generate_v4();

-- 

ALTER TABLE reports
ADD COLUMN user_email TEXT;

ALTER TABLE reports
ADD COLUMN job_uuid UUID;

UPDATE reports r
SET user_email = u.user_email
FROM users u
WHERE r.worker_user_id = u.user_id;

UPDATE reports r
SET job_uuid = j.job_uuid
FROM jobs j
WHERE r.job_id = j.job_id;

ALTER TABLE reports
ALTER COLUMN user_email SET NOT NULL;

ALTER TABLE reports
ALTER COLUMN job_uuid SET NOT NULL;

-- 

ALTER TABLE reports
ADD COLUMN report_uuid UUID;

UPDATE reports
SET report_uuid = uuid_generate_v4()
WHERE report_uuid IS NULL;

ALTER TABLE reports
ALTER COLUMN report_uuid SET NOT NULL;

ALTER TABLE reports
ADD CONSTRAINT reports_report_uuid_unique UNIQUE (report_uuid);

ALTER TABLE reports
ALTER COLUMN report_uuid
SET DEFAULT uuid_generate_v4();
