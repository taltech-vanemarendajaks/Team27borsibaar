package com.borsibaar.dto;

import java.util.List;
import java.util.UUID;

public record BarStationRequestDto(
    String name, String description, Boolean isActive, List<UUID> userIds) {}
