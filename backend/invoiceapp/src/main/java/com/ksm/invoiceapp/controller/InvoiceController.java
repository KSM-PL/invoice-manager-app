package com.ksm.invoiceapp.controller;


import com.ksm.invoiceapp.dto.InvoiceRequestDto;
import com.ksm.invoiceapp.mapper.StringResponseMapper;
import com.ksm.invoiceapp.service.AuthService;
import com.ksm.invoiceapp.service.InvoiceService;
import lombok.RequiredArgsConstructor;
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


    @PostMapping
    public ResponseEntity<Map<String,String>> createNewInvoice(@RequestBody  InvoiceRequestDto invoiceRequestDto){

        String invoiceId =  this.invoiceService.createNewInvoice(invoiceRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(StringResponseMapper.mapToMap(invoiceId));
    }

}
