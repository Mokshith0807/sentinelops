package com.sentinelops.incident.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sentinelops.incident.dto.IncidentRequest;
import com.sentinelops.incident.entity.Incident;
import com.sentinelops.incident.service.IncidentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incidents")
@Tag(
        name = "Incident Management",
        description = "APIs for creating, updating, deleting and searching cybersecurity incidents"
)
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @Operation(
            summary = "Create Incident",
            description = "Creates a new cybersecurity incident."
    )
    @ApiResponse(responseCode = "200", description = "Incident created successfully")
    @ApiResponse(responseCode = "400", description = "Validation failed", content = @Content)
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<Incident> create(
            @Valid @RequestBody IncidentRequest request) {

        return ResponseEntity.ok(
                incidentService.createIncident(request));
    }

    @Operation(
            summary = "Get All Incidents",
            description = "Returns all incidents with pagination and sorting."
    )
    @ApiResponse(responseCode = "200", description = "Incidents retrieved successfully")
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<Page<Incident>> getAll(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        return ResponseEntity.ok(
                incidentService.getAllIncidents(
                        page,
                        size,
                        sortBy));
    }

    @Operation(
            summary = "Get Incident By ID",
            description = "Returns a single incident by its ID."
    )
    @ApiResponse(responseCode = "200", description = "Incident found")
    @ApiResponse(responseCode = "404", description = "Incident not found", content = @Content)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<Incident> getOne(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                incidentService.getIncident(id));
    }

    @Operation(
            summary = "Update Incident",
            description = "Updates an existing incident. ADMIN only."
    )
    @ApiResponse(responseCode = "200", description = "Incident updated successfully")
    @ApiResponse(responseCode = "404", description = "Incident not found", content = @Content)
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Incident> update(
            @PathVariable Long id,
            @Valid @RequestBody IncidentRequest request) {

        return ResponseEntity.ok(
                incidentService.updateIncident(id, request));
    }

    @Operation(
            summary = "Delete Incident",
            description = "Deletes an incident. ADMIN only."
    )
    @ApiResponse(responseCode = "200", description = "Incident deleted successfully")
    @ApiResponse(responseCode = "404", description = "Incident not found", content = @Content)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        incidentService.deleteIncident(id);

        return ResponseEntity.ok("Incident deleted successfully");
    }

    @Operation(
            summary = "Search By Title",
            description = "Search incidents by title."
    )
    @GetMapping("/search/title")
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<List<Incident>> searchByTitle(
            @RequestParam String title) {

        return ResponseEntity.ok(
                incidentService.searchByTitle(title));
    }

    @Operation(
            summary = "Search By Severity",
            description = "Search incidents by severity."
    )
    @GetMapping("/search/severity")
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<List<Incident>> searchBySeverity(
            @RequestParam String severity) {

        return ResponseEntity.ok(
                incidentService.searchBySeverity(severity));
    }

    @Operation(
            summary = "Search By Status",
            description = "Search incidents by status."
    )
    @GetMapping("/search/status")
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<List<Incident>> searchByStatus(
            @RequestParam String status) {

        return ResponseEntity.ok(
                incidentService.searchByStatus(status));
    }

    @Operation(
            summary = "Search By Title And Severity",
            description = "Search incidents by title and severity."
    )
    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<List<Incident>> searchByTitleAndSeverity(
            @RequestParam String title,
            @RequestParam String severity) {

        return ResponseEntity.ok(
                incidentService.searchByTitleAndSeverity(
                        title,
                        severity));
    }
}