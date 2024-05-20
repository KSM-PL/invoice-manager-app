package com.ksm.invoiceapp.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InvoiceRequestDto {

    Date dueDate;
    String recipientEmail;
    Long amount;
    String currency;
    String name;
}
