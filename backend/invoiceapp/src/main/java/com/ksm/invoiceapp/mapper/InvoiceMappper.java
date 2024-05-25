package com.ksm.invoiceapp.mapper;

import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.dto.InvoiceResponseDto;
import com.ksm.invoiceapp.model.Invoice;
import com.ksm.invoiceapp.model.UserEntity;
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

    public InvoiceResponseDto mapToInvoiceResponseDto(Invoice invoice){

        UserEntity recipient = userService.findUserById(invoice.getRecipientId());
        UserEntity author = userService.findUserById(invoice.getAuthorId());

        String recipientEmail = recipient.getEmail();
        String recipientFullname = recipient.getFirstName() + " " + recipient.getLastName();

        String authorEmail = author.getEmail();
        String authorFullname = author.getFirstName() + " " + author.getLastName();


        return InvoiceResponseDto
                .builder()
                .id(invoice.getId())
                .createdAt(invoice.getCreated_at())
                .dueDate(invoice.getDueDate())
                .recipientEmail(recipientEmail)
                .recipientFullName(recipientFullname)
                .authorEmail(authorEmail)
                .authorFullName(authorFullname)
                .amount(invoice.getAmount())
                .currency(invoice.getCurrency())
                .isPaid(invoice.getIsPaid())
                .name(invoice.getName())
                .build();
    }
}
