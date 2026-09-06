package com.sentinelops.ai.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import com.sentinelops.ai.dto.AIResponse;
import com.sentinelops.ai.dto.IncidentAIRequest;
import com.sentinelops.ai.dto.IncidentAIResponse;
import com.sentinelops.ai.dto.IncidentReportRequest;
import com.sentinelops.ai.dto.IncidentReportResponse;
import com.sentinelops.ai.dto.gemini.GeminiRequest;
import com.sentinelops.ai.dto.gemini.GeminiResponse;
import com.sentinelops.exception.AiServiceUnavailableException;

@Service
public class AIServiceImpl implements AIService {

    private final RestClient restClient;

    public AIServiceImpl(RestClient geminiRestClient) {
        this.restClient = geminiRestClient;
    }

    @Override
    public AIResponse askGemini(String prompt) {

        if (prompt == null || prompt.isBlank()) {
            throw new IllegalArgumentException("Prompt must not be blank");
        }

        try {
            GeminiRequest request = new GeminiRequest(prompt);

            GeminiResponse response = restClient.post()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(GeminiResponse.class);

            String answer = "";

            if (response != null
                    && response.getCandidates() != null
                    && !response.getCandidates().isEmpty()
                    && response.getCandidates().get(0).getContent() != null
                    && response.getCandidates().get(0).getContent().getParts() != null
                    && !response.getCandidates().get(0).getContent().getParts().isEmpty()) {

                answer = response.getCandidates()
                        .get(0)
                        .getContent()
                        .getParts()
                        .get(0)
                        .getText();
            } else {
                answer = "No response received from Gemini.";
            }

            return new AIResponse(answer);

        } catch (RestClientResponseException ex) {
            int status = ex.getStatusCode().value();
            if (status == 429) {
                throw new AiServiceUnavailableException(
                        "Gemini rate limit exceeded (429). Please retry shortly.", 429);
            }
            if (status == 503 || status == 502 || status == 504) {
                throw new AiServiceUnavailableException(
                        "Gemini service temporarily unavailable (" + status + "). Please retry shortly.", 503);
            }
            throw new AiServiceUnavailableException(
                    "Gemini request failed (" + status + "): " + ex.getMessage(), status);
        } catch (AiServiceUnavailableException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new AiServiceUnavailableException(
                    "Gemini AI is temporarily unavailable. Reason: " + ex.getMessage());
        }
    }

    @Override
    public IncidentAIResponse analyzeIncident(IncidentAIRequest request) {

        if (request.getTitle() == null || request.getTitle().isBlank()
                || request.getDescription() == null || request.getDescription().isBlank()) {
            throw new IllegalArgumentException("Title and description must not be blank");
        }

        String prompt = """
                You are a cybersecurity expert.

                Analyze the following security incident.

                Title:
                %s

                Description:
                %s

                Return ONLY this format:

                Severity: <LOW|MEDIUM|HIGH|CRITICAL>
                Analysis: <analysis>
                Recommendation: <recommendation>
                """
                .formatted(
                        request.getTitle(),
                        request.getDescription());

        AIResponse aiResponse = askGemini(prompt);

        IncidentAIResponse result = new IncidentAIResponse();

        String raw = aiResponse.getResponse() == null ? "" : aiResponse.getResponse();
        String[] lines = raw.split("\\r?\\n");

        StringBuilder analysis = new StringBuilder();
        StringBuilder recommendation = new StringBuilder();
        String current = null;

        for (String line : lines) {
            String cleaned = line.replace("*", "").trim();
            String lower = cleaned.toLowerCase();
            if (lower.startsWith("severity:")) {
                String val = cleaned.substring(cleaned.indexOf(':') + 1).trim().toUpperCase();
                if (val.matches("LOW|MEDIUM|HIGH|CRITICAL")) {
                    result.setSeverity(val);
                } else {
                    result.setSeverity(val);
                }
                current = null;
            } else if (lower.startsWith("analysis:")) {
                current = "analysis";
                analysis.append(cleaned.substring(cleaned.indexOf(':') + 1).trim());
            } else if (lower.startsWith("recommendation:")
                    || lower.startsWith("recommendations:")) {
                current = "recommendation";
                recommendation.append(cleaned.substring(cleaned.indexOf(':') + 1).trim());
            } else if (!cleaned.isEmpty() && current != null) {
                if ("analysis".equals(current)) {
                    if (!analysis.isEmpty()) analysis.append(" ");
                    analysis.append(cleaned);
                } else {
                    if (!recommendation.isEmpty()) recommendation.append(" ");
                    recommendation.append(cleaned);
                }
            }
        }

        if (result.getSeverity() == null || result.getSeverity().isBlank()) {
            result.setSeverity("MEDIUM");
        }
        result.setAnalysis(!analysis.isEmpty() ? analysis.toString() : raw);
        result.setRecommendation(!recommendation.isEmpty() ? recommendation.toString()
                : "Follow standard incident response playbook and review logs.");

        return result;
    }

    @Override
    public IncidentReportResponse generateReport(IncidentReportRequest request) {

        String prompt = """
                You are a senior SOC analyst.

                Generate a professional cybersecurity incident report.

                Incident Title:
                %s

                Severity:
                %s

                Description:
                %s

                Include:

                Executive Summary

                Technical Analysis

                Business Impact

                Recommendations

                MITRE ATT&CK Technique

                Estimated CVSS Score

                Format it professionally.
                """
                .formatted(
                        request.getTitle(),
                        request.getSeverity(),
                        request.getDescription());

        AIResponse response = askGemini(prompt);

        return new IncidentReportResponse(response.getResponse());
    }

}
