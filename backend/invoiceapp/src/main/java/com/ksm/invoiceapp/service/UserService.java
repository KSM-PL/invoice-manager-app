package com.ksm.invoiceapp.service;

import com.ksm.invoiceapp.dto.UserResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {


    Boolean checkEmailAvailability(String email);

}
