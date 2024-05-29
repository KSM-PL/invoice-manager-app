package com.ksm.invoiceapp.service;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.dto.InvoiceResponseDto;
import org.springframework.data.domain.Page;

public interface InvoiceService {
    String createNewInvoice(InvoiceRequestDto invoiceRequestDto);

    Page<InvoiceResponseDto> getInvoicesForUserId(String type, int pageNumber, int pageSize, String sortField, String sortDirection);

    void payInvoice(String invoiceId);

    InvoiceResponseDto getInvoiceById(String invoiceId);
}
