package com.sentinelops.auth.service;

import com.sentinelops.auth.dto.AuthResponse;
import com.sentinelops.auth.dto.LoginRequest;
import com.sentinelops.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}