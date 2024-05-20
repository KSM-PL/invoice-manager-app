package com.ksm.invoiceapp.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.ArrayList;
import java.util.List;


@Data
@EqualsAndHashCode
@Document(value = "user")
public class UserEntity {

    @Id
    private String id;
    private String firstName;
    private String lastName;

    private String email;
    private String password;

    private List<Role> roles = new ArrayList<>();
}
