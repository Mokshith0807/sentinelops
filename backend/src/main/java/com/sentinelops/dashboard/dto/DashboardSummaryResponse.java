package com.sentinelops.dashboard.dto;

public class DashboardSummaryResponse {

    private long totalIncidents;
    private long openIncidents;
    private long resolvedIncidents;
    private long highSeverity;
    private long criticalSeverity;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(
            long totalIncidents,
            long openIncidents,
            long resolvedIncidents,
            long highSeverity,
            long criticalSeverity) {

        this.totalIncidents = totalIncidents;
        this.openIncidents = openIncidents;
        this.resolvedIncidents = resolvedIncidents;
        this.highSeverity = highSeverity;
        this.criticalSeverity = criticalSeverity;
    }

    public long getTotalIncidents() {
        return totalIncidents;
    }

    public void setTotalIncidents(long totalIncidents) {
        this.totalIncidents = totalIncidents;
    }

    public long getOpenIncidents() {
        return openIncidents;
    }

    public void setOpenIncidents(long openIncidents) {
        this.openIncidents = openIncidents;
    }

    public long getResolvedIncidents() {
        return resolvedIncidents;
    }

    public void setResolvedIncidents(long resolvedIncidents) {
        this.resolvedIncidents = resolvedIncidents;
    }

    public long getHighSeverity() {
        return highSeverity;
    }

    public void setHighSeverity(long highSeverity) {
        this.highSeverity = highSeverity;
    }

    public long getCriticalSeverity() {
        return criticalSeverity;
    }

    public void setCriticalSeverity(long criticalSeverity) {
        this.criticalSeverity = criticalSeverity;
    }
}