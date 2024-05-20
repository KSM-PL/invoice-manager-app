package com.ksm.invoiceapp.service.serviceImpl;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.mapper.InvoiceMappper;
import com.ksm.invoiceapp.model.Invoice;
import com.ksm.invoiceapp.model.UserEntity;
import com.ksm.invoiceapp.repository.InvoiceRepository;
import com.ksm.invoiceapp.service.AuthService;
import com.ksm.invoiceapp.service.InvoiceService;
import com.ksm.invoiceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
@RequiredArgsConstructor
@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceMappper invoiceMappper;
    private final InvoiceRepository invoiceRepository;

    @Override
    public String createNewInvoice(InvoiceRequestDto invoiceRequestDto) {
        Invoice invoice = invoiceMappper.mapToInvoice(invoiceRequestDto);
        Invoice invoiceDb = invoiceRepository.save(invoice);
        return invoiceDb.getId();
    }
}
