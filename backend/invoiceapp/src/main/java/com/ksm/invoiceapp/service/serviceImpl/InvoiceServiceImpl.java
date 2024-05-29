package com.ksm.invoiceapp.service.serviceImpl;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.dto.InvoiceResponseDto;
import com.ksm.invoiceapp.mapper.InvoiceMappper;
import com.ksm.invoiceapp.model.Invoice;
import com.ksm.invoiceapp.model.UserEntity;
import com.ksm.invoiceapp.repository.InvoiceRepository;
import com.ksm.invoiceapp.service.AuthService;
import com.ksm.invoiceapp.service.InvoiceService;
import com.ksm.invoiceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceMappper invoiceMappper;
    private final InvoiceRepository invoiceRepository;
    private final AuthService authService;

    @Override
    public String createNewInvoice(InvoiceRequestDto invoiceRequestDto) {
        Invoice invoice = invoiceMappper.mapToInvoice(invoiceRequestDto);
        Invoice invoiceDb = invoiceRepository.save(invoice);
        return invoiceDb.getId();
    }

    @Override
    public Page<InvoiceResponseDto> getInvoicesForUserId(String type, int pageNumber, int pageSize, String sortField, String sortDirection) {
        String userId = authService.getLoggedUser().getId();

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(direction, sortField));

        Page<Invoice> invoices = null;
        
        if (Objects.equals(type, "in")) {
            invoices = invoiceRepository.findByRecipientId(userId, pageable);
        } else if (Objects.equals(type, "out")) {
            invoices = invoiceRepository.findByAuthorId(userId, pageable);
        }

        return new PageImpl<>(
                invoices.stream()
                        .map(invoiceMappper::mapToInvoiceResponseDto)
                        .collect(Collectors.toList()),
                pageable,
                invoices.getTotalElements()
        );
    }

    @Override
    public void payInvoice(String invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new IllegalArgumentException("Invoice with ID " + invoiceId + " not found"));
        invoice.setIsPaid(true);
        invoiceRepository.save(invoice);
    }

    @Override
    public InvoiceResponseDto getInvoiceById(String invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new IllegalArgumentException("Invoice with ID " + invoiceId + " not found"));
        return invoiceMappper.mapToInvoiceResponseDto(invoice);
    }
}
