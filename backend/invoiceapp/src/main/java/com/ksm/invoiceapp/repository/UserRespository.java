package com.ksm.invoiceapp.repository;

import com.ksm.invoiceapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRespository extends MongoRepository<User,String> {


}
