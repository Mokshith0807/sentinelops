package com.sentinelops.ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sentinelops.ai.dto.AIResponse;
import com.sentinelops.ai.dto.IncidentAIRequest;
import com.sentinelops.ai.dto.IncidentAIResponse;
import com.sentinelops.ai.service.AIService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/ai")
@Tag(
        name = "Artificial Intelligence",
        description = "Google Gemini powered AI endpoints for cybersecurity assistance and incident analysis"
)
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @Operation(
            summary = "Ask AI",
            description = "Ask Google Gemini any cybersecurity related question."
    )
    @ApiResponse(
            responseCode = "200",
            description = "AI response generated successfully"
    )
    @ApiResponse(
            responseCode = "500",
            description = "AI service unavailable",
            content = @Content
    )
    @GetMapping("/ask")
    public ResponseEntity<AIResponse> askAI(
            @RequestParam @NotBlank(message = "Prompt must not be blank") String prompt) {

        return ResponseEntity.ok(
                aiService.askGemini(prompt));
    }

    @Operation(
            summary = "Analyze Incident",
            description = "Uses Google Gemini to analyze a cybersecurity incident and returns severity, analysis and recommendations."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Incident analyzed successfully"
    )
    @ApiResponse(
            responseCode = "400",
            description = "Invalid request",
            content = @Content
    )
    @ApiResponse(
            responseCode = "500",
            description = "AI service unavailable",
            content = @Content
    )
    @PostMapping("/analyze")
    public ResponseEntity<IncidentAIResponse> analyzeIncident(
            @Valid @RequestBody IncidentAIRequest request) {

        return ResponseEntity.ok(
                aiService.analyzeIncident(request));
    }
}