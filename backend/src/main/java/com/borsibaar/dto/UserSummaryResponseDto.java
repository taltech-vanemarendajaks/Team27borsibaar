package com.borsibaar.dto;

import java.util.UUID;

public record UserSummaryResponseDto(UUID id, String email, String name, String role) {}
