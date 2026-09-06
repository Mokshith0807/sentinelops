package com.sentinelops.audit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sentinelops.audit.entity.AuditLog;
import com.sentinelops.audit.repository.AuditLogRepository;
import com.sentinelops.incident.entity.Incident;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public void log(
            String action,
            String username,
            Incident incident) {

        AuditLog auditLog = new AuditLog();

        auditLog.setAction(action);
        auditLog.setUsername(username);
        auditLog.setIncident(incident);

        auditLogRepository.save(auditLog);
    }

    @Override
    public List<AuditLog> getAllLogs() {

        return auditLogRepository.findAll();
    }
}