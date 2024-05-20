package com.ksm.invoiceapp.model;


import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@EqualsAndHashCode
@Document
public class Invoice {

    @Id
    String id;

    Boolean isPaid;

    Date dueDate;

    Date created_at;

    String recipientId;

    String authorId;

    Long amount;

    String currency;

    String name;
}
