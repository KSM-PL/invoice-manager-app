package com.ksm.invoiceapp.repository;


import com.ksm.invoiceapp.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role> findByName(String name);
}

