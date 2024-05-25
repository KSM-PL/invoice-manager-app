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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
    public Page<InvoiceResponseDto> getInvoicesForUserId(String type, int pageNumber, int pageSize) {
        String userId = authService.getLoggedUser().getId();
        Page<Invoice> invoices=null;

        System.out.println("LoggedUser");
        if(Objects.equals(type, "in")){
            invoices = invoiceRepository.findByRecipientId(userId,PageRequest.of(pageNumber,pageSize));
        }else if(Objects.equals(type, "out")){
            invoices = invoiceRepository.findByAuthorId(userId,PageRequest.of(pageNumber,pageSize));
        }



        return new PageImpl<>(
                invoices
                        .stream()
                        .map(invoiceMappper::mapToInvoiceResponseDto)
                        .collect(Collectors.toList()), PageRequest.of(pageNumber,pageSize),
                invoices.getTotalElements()
        );
    }
}
