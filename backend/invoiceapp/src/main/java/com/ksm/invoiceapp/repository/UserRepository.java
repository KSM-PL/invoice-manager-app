package com.ksm.invoiceapp.repository;

import com.ksm.invoiceapp.model.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity,String> {

    Optional<UserEntity> findByEmail(String email);


    boolean existsByEmail(String email);
}
