package com.sentinelops.ai.service;

import com.sentinelops.ai.dto.AIResponse;
import com.sentinelops.ai.dto.IncidentAIRequest;
import com.sentinelops.ai.dto.IncidentAIResponse;
import com.sentinelops.ai.dto.IncidentReportRequest;
import com.sentinelops.ai.dto.IncidentReportResponse;

public interface AIService {

    AIResponse askGemini(String prompt);

    IncidentAIResponse analyzeIncident(IncidentAIRequest request);

    IncidentReportResponse generateReport(IncidentReportRequest request);

}