package com.ksm.invoiceapp.service;

import com.ksm.invoiceapp.model.UserEntity;

public interface AuthService {

    UserEntity getLoggedUser();
}