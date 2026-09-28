package com.manmeet.userlistingapplication.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank String name,
        boolean enabled
) {
}
