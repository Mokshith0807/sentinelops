package com.sentinelops.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sentinelops.dashboard.dto.DashboardResponse;
import com.sentinelops.dashboard.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/dashboard")
@Tag(
        name = "Dashboard",
        description = "Dashboard APIs providing cybersecurity incident statistics and analytics"
)
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Operation(
            summary = "Get Dashboard Statistics",
            description = """
                    Returns the overall dashboard statistics including:
                    • Total incidents
                    • Open incidents
                    • Closed incidents
                    • Critical incidents
                    """
    )
    @ApiResponse(
            responseCode = "200",
            description = "Dashboard statistics retrieved successfully"
    )
    @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
    )
    @ApiResponse(
            responseCode = "403",
            description = "Access denied"
    )
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ENGINEER','ADMIN')")
    public ResponseEntity<DashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboard());
    }
}