package com.sentinelops.incident.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sentinelops.incident.entity.Incident;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    // Search
    List<Incident> findByTitleContainingIgnoreCase(String title);

    List<Incident> findBySeverityIgnoreCase(String severity);

    List<Incident> findByStatusIgnoreCase(String status);

    List<Incident> findByTitleContainingIgnoreCaseAndSeverityIgnoreCase(
            String title,
            String severity);

    // Dashboard Counts
    long countByStatusIgnoreCase(String status);

    long countBySeverityIgnoreCase(String severity);

}