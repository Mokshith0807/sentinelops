package com.sentinelops.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sentinelops.auth.dto.AuthResponse;
import com.sentinelops.auth.dto.LoginRequest;
import com.sentinelops.auth.dto.RegisterRequest;
import com.sentinelops.auth.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(
        name = "Authentication",
        description = "APIs for user registration and login"
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account and returns a JWT token."
    )
    @ApiResponse(
            responseCode = "200",
            description = "User registered successfully"
    )
    @ApiResponse(
            responseCode = "400",
            description = "Validation failed",
            content = @Content
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                authService.register(request));
    }

    @Operation(
            summary = "Login",
            description = "Authenticates a user and returns a JWT token."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Login successful"
    )
    @ApiResponse(
            responseCode = "401",
            description = "Invalid credentials",
            content = @Content
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request));
    }

}