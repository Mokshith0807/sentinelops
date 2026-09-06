package com.sentinelops.test;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/hello")
    public String hello(Authentication authentication) {

        return "Hello " + authentication.getName()
                + ", JWT Authentication is Working!";
    }
}