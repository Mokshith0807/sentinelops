package com.sentinelops.dashboard.dto;

public class DashboardResponse {

    private long totalIncidents;

    private long openIncidents;

    private long inProgressIncidents;

    private long resolvedIncidents;

    private long criticalIncidents;

    private long highIncidents;

    private long mediumIncidents;

    private long lowIncidents;

    public DashboardResponse() {
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

    public long getInProgressIncidents() {
        return inProgressIncidents;
    }

    public void setInProgressIncidents(long inProgressIncidents) {
        this.inProgressIncidents = inProgressIncidents;
    }

    public long getResolvedIncidents() {
        return resolvedIncidents;
    }

    public void setResolvedIncidents(long resolvedIncidents) {
        this.resolvedIncidents = resolvedIncidents;
    }

    public long getCriticalIncidents() {
        return criticalIncidents;
    }

    public void setCriticalIncidents(long criticalIncidents) {
        this.criticalIncidents = criticalIncidents;
    }

    public long getHighIncidents() {
        return highIncidents;
    }

    public void setHighIncidents(long highIncidents) {
        this.highIncidents = highIncidents;
    }

    public long getMediumIncidents() {
        return mediumIncidents;
    }

    public void setMediumIncidents(long mediumIncidents) {
        this.mediumIncidents = mediumIncidents;
    }

    public long getLowIncidents() {
        return lowIncidents;
    }

    public void setLowIncidents(long lowIncidents) {
        this.lowIncidents = lowIncidents;
    }
}