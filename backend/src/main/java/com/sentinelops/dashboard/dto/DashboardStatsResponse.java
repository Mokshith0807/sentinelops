package com.sentinelops.dashboard.dto;

public class DashboardStatsResponse {

    private long totalIncidents;

    private long open;

    private long inProgress;

    private long resolved;

    private long critical;

    private long high;

    private long medium;

    private long low;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(
            long totalIncidents,
            long open,
            long inProgress,
            long resolved,
            long critical,
            long high,
            long medium,
            long low) {

        this.totalIncidents = totalIncidents;
        this.open = open;
        this.inProgress = inProgress;
        this.resolved = resolved;
        this.critical = critical;
        this.high = high;
        this.medium = medium;
        this.low = low;
    }

    public long getTotalIncidents() {
        return totalIncidents;
    }

    public void setTotalIncidents(long totalIncidents) {
        this.totalIncidents = totalIncidents;
    }

    public long getOpen() {
        return open;
    }

    public void setOpen(long open) {
        this.open = open;
    }

    public long getInProgress() {
        return inProgress;
    }

    public void setInProgress(long inProgress) {
        this.inProgress = inProgress;
    }

    public long getResolved() {
        return resolved;
    }

    public void setResolved(long resolved) {
        this.resolved = resolved;
    }

    public long getCritical() {
        return critical;
    }

    public void setCritical(long critical) {
        this.critical = critical;
    }

    public long getHigh() {
        return high;
    }

    public void setHigh(long high) {
        this.high = high;
    }

    public long getMedium() {
        return medium;
    }

    public void setMedium(long medium) {
        this.medium = medium;
    }

    public long getLow() {
        return low;
    }

    public void setLow(long low) {
        this.low = low;
    }
}