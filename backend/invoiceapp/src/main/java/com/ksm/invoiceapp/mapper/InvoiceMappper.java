package com.ksm.invoiceapp.mapper;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.model.Invoice;
import com.ksm.invoiceapp.service.AuthService;
import com.ksm.invoiceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class InvoiceMappper {

    private final AuthService authService;
    private final UserService userService;

    public Invoice mapToInvoice(InvoiceRequestDto invoiceRequestDto){

        String authorId = authService.getLoggedUser().getId();

        String recipientId = userService.findUserByEmail(
                invoiceRequestDto.getRecipientEmail()).getId();



        return Invoice.builder()
                .created_at(new Date())
                .amount(invoiceRequestDto.getAmount())
                .currency(invoiceRequestDto.getCurrency())
                .recipientId(recipientId)
                .authorId(authorId)
                .dueDate(invoiceRequestDto.getDueDate())
                .name(invoiceRequestDto.getName())
                .isPaid(false)
                .build();
    }
}
