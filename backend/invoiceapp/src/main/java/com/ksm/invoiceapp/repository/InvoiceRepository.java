package com.ksm.invoiceapp.repository;

import com.ksm.invoiceapp.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {


    Page<Invoice> findByRecipientId(String id, Pageable pageable);

    Page<Invoice> findByAuthorId(String id, Pageable pageable);


}
