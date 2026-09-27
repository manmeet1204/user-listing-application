package com.manmeet.userlistingapplication.dto;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String name,
        String email,
        boolean enabled,
        String provider,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
