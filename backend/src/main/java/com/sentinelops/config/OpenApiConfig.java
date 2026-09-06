package com.sentinelops.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI sentinelOpsOpenAPI() {

        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()

                .info(new Info()

                        .title("SentinelOps Lite API")

                        .version("1.0.0")

                        .description("""
                                SentinelOps Lite is a Cybersecurity Incident Management System.

                                Features:
                                • JWT Authentication
                                • Role Based Authorization
                                • Incident Management
                                • Google Gemini AI
                                • AI Incident Analysis
                                • Dashboard
                                • Audit Logs
                                """)

                        .contact(new Contact()
                                .name("Mokshith")
                                .email("mokshith@gmail.com"))

                        .license(new License()
                                .name("MIT License")))

                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName))

                .components(
                        new Components()
                                .addSecuritySchemes(
                                        securitySchemeName,
                                        new SecurityScheme()

                                                .name("Authorization")

                                                .type(SecurityScheme.Type.HTTP)

                                                .scheme("bearer")

                                                .bearerFormat("JWT")));
    }
}