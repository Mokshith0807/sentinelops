CREATE TABLE audit_logs (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    action VARCHAR(50) NOT NULL,

    username VARCHAR(100) NOT NULL,

    incident_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_incident
        FOREIGN KEY (incident_id)
        REFERENCES incidents(id)
        ON DELETE SET NULL
);