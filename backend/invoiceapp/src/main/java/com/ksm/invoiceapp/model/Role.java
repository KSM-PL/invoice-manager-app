package com.ksm.invoiceapp.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
@Data
@Builder
public class Role {

    @Id
    private String id;

    private String name;
}
