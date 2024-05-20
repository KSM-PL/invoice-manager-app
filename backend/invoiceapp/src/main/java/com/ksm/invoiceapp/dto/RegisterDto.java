package com.ksm.invoiceapp.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String password;
    private String passwordRepeated;
    private String firstName;
    private String lastName;
}
