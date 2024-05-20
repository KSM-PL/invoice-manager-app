package com.ksm.invoiceapp.repository;

import com.ksm.invoiceapp.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {

}
