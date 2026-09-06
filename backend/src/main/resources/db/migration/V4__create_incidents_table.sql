CREATE TABLE incidents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description VARCHAR(1000),

    location VARCHAR(255),

    category VARCHAR(100),

    severity VARCHAR(100),

    status VARCHAR(100),

    created_at DATETIME,

    reported_by BIGINT,

    CONSTRAINT fk_incident_user
    FOREIGN KEY (reported_by)
    REFERENCES users(id)
);