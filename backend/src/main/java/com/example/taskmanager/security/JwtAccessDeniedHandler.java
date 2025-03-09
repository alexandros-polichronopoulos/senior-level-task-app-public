package com.example.taskmanager.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException
    ) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403 Forbidden

        PrintWriter writer = response.getWriter();
        writer.write("{ \"timestamp\": \"" + new Date() + "\", " +
                "\"status\": 403, " +
                "\"error\": \"Forbidden\", " +
                "\"message\": \"You do not have permission to access this resource.\" }");
        writer.flush();
    }
}