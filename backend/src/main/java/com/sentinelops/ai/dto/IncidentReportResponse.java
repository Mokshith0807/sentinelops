package com.sentinelops.ai.dto;

public class IncidentReportResponse {

    private String report;

    public IncidentReportResponse() {
    }

    public IncidentReportResponse(String report) {
        this.report = report;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }
}