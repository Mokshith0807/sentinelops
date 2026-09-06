package com.sentinelops.incident.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.sentinelops.incident.dto.IncidentRequest;
import com.sentinelops.incident.entity.Incident;

public interface IncidentService {

    Incident createIncident(IncidentRequest request);

    Page<Incident> getAllIncidents(
            int page,
            int size,
            String sortBy);

    Incident getIncident(Long id);

    Incident updateIncident(
            Long id,
            IncidentRequest request);

    void deleteIncident(Long id);

    // Search APIs
    List<Incident> searchByTitle(String title);

    List<Incident> searchBySeverity(String severity);

    List<Incident> searchByStatus(String status);

    List<Incident> searchByTitleAndSeverity(
            String title,
            String severity);
}