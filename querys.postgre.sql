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



INSERT INTO roles (role_name) VALUES
('admin'),
('office'),
('worker');
SELECT * FROM roles;

INSERT INTO users (user_name, user_email, password_hash, role_id, is_active)
VALUES (
  'Admin Principal',
  'admin@airflow.com',
  '$2b$10$hashadminexample',
  1,
  true
);

INSERT INTO users (user_name, user_email, password_hash, role_id, is_active)
VALUES (
  'Oficina Central',
  'office@airflow.com',
  '$2b$10$hashofficeexample',
  2,
  true
);

INSERT INTO users (user_name, user_email, password_hash, role_id, is_active)
VALUES (
  'Juan Pérez',
  'juan.perez@airflow.com',
  '$2b$10$hashworker1example',
  3,
  true
);

INSERT INTO users (user_name, user_email, password_hash, role_id, is_active)
VALUES (
  'Laura Gómez',
  'laura.gomez@airflow.com',
  '$2b$10$hashworker2example',
  3,
  true
);

SELECT * FROM users;

