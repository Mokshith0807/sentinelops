package com.sentinelops.dashboard.service;

import org.springframework.stereotype.Service;

import com.sentinelops.dashboard.dto.DashboardResponse;
import com.sentinelops.incident.repository.IncidentRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final IncidentRepository incidentRepository;

    public DashboardServiceImpl(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalIncidents(
                incidentRepository.count());

        response.setOpenIncidents(
                incidentRepository.countByStatusIgnoreCase("OPEN"));

        response.setInProgressIncidents(
                incidentRepository.countByStatusIgnoreCase("IN_PROGRESS"));

        response.setResolvedIncidents(
                incidentRepository.countByStatusIgnoreCase("RESOLVED"));

        response.setCriticalIncidents(
                incidentRepository.countBySeverityIgnoreCase("CRITICAL"));

        response.setHighIncidents(
                incidentRepository.countBySeverityIgnoreCase("HIGH"));

        response.setMediumIncidents(
                incidentRepository.countBySeverityIgnoreCase("MEDIUM"));

        response.setLowIncidents(
                incidentRepository.countBySeverityIgnoreCase("LOW"));

        return response;
    }
}