package com.sentinelops.audit.service;

import java.util.List;

import com.sentinelops.audit.entity.AuditLog;
import com.sentinelops.incident.entity.Incident;

public interface AuditLogService {

    void log(
            String action,
            String username,
            Incident incident);

    List<AuditLog> getAllLogs();

}