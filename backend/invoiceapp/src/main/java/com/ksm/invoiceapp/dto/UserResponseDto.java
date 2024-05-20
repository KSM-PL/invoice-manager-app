package com.ksm.invoiceapp.dto;

import com.ksm.invoiceapp.model.Role;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class UserResponseDto {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;

    private List<Role> roles;
}