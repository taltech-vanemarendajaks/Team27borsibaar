package com.borsibaar.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record OrganizationResponseDto(
    Long id,
    String name,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    BigDecimal priceIncreaseStep,
    BigDecimal priceDecreaseStep) {}
