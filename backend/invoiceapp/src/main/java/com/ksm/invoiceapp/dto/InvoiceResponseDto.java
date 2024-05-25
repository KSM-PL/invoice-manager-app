package com.ksm.invoiceapp.dto;


import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class InvoiceResponseDto {

    String id;
    Boolean isPaid;
    Date dueDate;
    Date createdAt;
    String recipientEmail;
    String recipientFullName;
    String authorEmail;
    String authorFullName;
    Long amount;
    String currency;
    String name;

}
