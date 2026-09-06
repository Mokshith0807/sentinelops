package com.sentinelops.incident.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.sentinelops.audit.service.AuditLogService;
import com.sentinelops.auth.repository.UserRepository;
import com.sentinelops.exception.ResourceNotFoundException;
import com.sentinelops.incident.dto.IncidentRequest;
import com.sentinelops.incident.entity.Incident;
import com.sentinelops.incident.repository.IncidentRepository;

@Service
public class IncidentServiceImpl implements IncidentService {

    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("id", "title", "severity", "status", "createdAt", "category", "location");

    private final IncidentRepository incidentRepository;
    private final AuditLogService auditLogService;
    private final UserRepository userRepository;

    public IncidentServiceImpl(
            IncidentRepository incidentRepository,
            AuditLogService auditLogService,
            UserRepository userRepository) {

        this.incidentRepository = incidentRepository;
        this.auditLogService = auditLogService;
        this.userRepository = userRepository;
    }

    private String getLoggedInUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return "SYSTEM";
        }

        return authentication.getName();
    }

    @Override
    public Incident createIncident(IncidentRequest request) {

        Incident incident = new Incident();

        incident.setTitle(request.getTitle());
        incident.setDescription(request.getDescription());
        incident.setSeverity(request.getSeverity());
        incident.setStatus(request.getStatus());
        incident.setLocation(request.getLocation());
        incident.setCategory(request.getCategory());
        incident.setCreatedAt(LocalDateTime.now());

        userRepository.findByEmail(getLoggedInUser())
                .ifPresent(incident::setReportedBy);

        Incident savedIncident = incidentRepository.save(incident);

        auditLogService.log(
                "CREATED",
                getLoggedInUser(),
                savedIncident);

        return savedIncident;
    }

    @Override
    public Page<Incident> getAllIncidents(
            int page,
            int size,
            String sortBy) {

        String safeSort = ALLOWED_SORT_FIELDS.contains(sortBy) ? sortBy : "id";

        return incidentRepository.findAll(
                PageRequest.of(page, size, Sort.by(safeSort).ascending()));
    }

    @Override
    public Incident getIncident(Long id) {

        return incidentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Incident not found with id " + id));
    }

    @Override
    public Incident updateIncident(
            Long id,
            IncidentRequest request) {

        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Incident not found with id " + id));

        incident.setTitle(request.getTitle());
        incident.setDescription(request.getDescription());
        incident.setSeverity(request.getSeverity());
        incident.setStatus(request.getStatus());
        incident.setLocation(request.getLocation());
        incident.setCategory(request.getCategory());

        Incident updatedIncident = incidentRepository.save(incident);

        auditLogService.log(
                "UPDATED",
                getLoggedInUser(),
                updatedIncident);

        return updatedIncident;
    }

    @Override
    public void deleteIncident(Long id) {

        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Incident not found with id " + id));

        auditLogService.log(
                "DELETED",
                getLoggedInUser(),
                incident);

        incidentRepository.delete(incident);
    }

    @Override
    public List<Incident> searchByTitle(String title) {
        return incidentRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Incident> searchBySeverity(String severity) {
        return incidentRepository.findBySeverityIgnoreCase(severity);
    }

    @Override
    public List<Incident> searchByStatus(String status) {
        return incidentRepository.findByStatusIgnoreCase(status);
    }

    @Override
    public List<Incident> searchByTitleAndSeverity(
            String title,
            String severity) {

        return incidentRepository
                .findByTitleContainingIgnoreCaseAndSeverityIgnoreCase(
                        title,
                        severity);
    }
}
