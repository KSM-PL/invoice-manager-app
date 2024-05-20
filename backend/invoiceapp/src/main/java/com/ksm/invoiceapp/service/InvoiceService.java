package com.ksm.invoiceapp.service;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;

public interface InvoiceService {
    String createNewInvoice(InvoiceRequestDto invoiceRequestDto);
}
