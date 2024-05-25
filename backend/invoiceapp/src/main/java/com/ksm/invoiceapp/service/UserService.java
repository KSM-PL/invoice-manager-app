package com.ksm.invoiceapp.service;

import com.ksm.invoiceapp.dto.UserResponseDto;
import com.ksm.invoiceapp.model.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {


    Boolean checkEmailAvailability(String email);

    UserEntity findUserByEmail(String email);

    UserEntity findUserById(String id);
}
