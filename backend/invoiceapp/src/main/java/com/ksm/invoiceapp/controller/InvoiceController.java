package com.ksm.invoiceapp.controller;


import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.dto.InvoiceResponseDto;
import com.ksm.invoiceapp.mapper.StringResponseMapper;
import com.ksm.invoiceapp.service.AuthService;
import com.ksm.invoiceapp.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/invoices/")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InvoiceController {

    private final InvoiceService invoiceService;


    @GetMapping
    public ResponseEntity<Page<InvoiceResponseDto>> getInvoicesForUser(@RequestParam String type,
                                                                       @RequestParam int pageNumber,
                                                                       @RequestParam int pageSize,
                                                                       @RequestParam(required = false, defaultValue = "created_at") String sortField,
                                                                       @RequestParam(required = false, defaultValue = "ASC") String sortDirection)
    {
        Page<InvoiceResponseDto> res = invoiceService.getInvoicesForUserId(type, pageNumber, pageSize, sortField, sortDirection);
    return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping
    public ResponseEntity<Map<String,String>> createNewInvoice(@RequestBody  InvoiceRequestDto invoiceRequestDto){

        String invoiceId =  this.invoiceService.createNewInvoice(invoiceRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(invoiceId));
    }

    @PutMapping("/{invoiceId}/pay")
    public ResponseEntity<Map<String, String>> payInvoice(@PathVariable String invoiceId) {
        invoiceService.payInvoice(invoiceId);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Invoice paid successfully"));
    }


    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceResponseDto> getInvoiceById(@PathVariable String invoiceId) {
        InvoiceResponseDto invoiceResponseDto = invoiceService.getInvoiceById(invoiceId);
        return ResponseEntity.status(HttpStatus.OK).body(invoiceResponseDto);
    }

    @GetMapping("/history")
    public ResponseEntity<Page<InvoiceResponseDto>> getInvoicesPaidForUser(@RequestParam String type,
                                                                       @RequestParam Boolean isPaid,
                                                                       @RequestParam int pageNumber,
                                                                       @RequestParam int pageSize,
                                                                       @RequestParam(required = false, defaultValue = "created_at") String sortField,
                                                                       @RequestParam(required = false, defaultValue = "ASC") String sortDirection)
    {
        Page<InvoiceResponseDto> res = invoiceService.getInvoicesPaidForUser(type,isPaid, pageNumber, pageSize, sortField, sortDirection);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


}
