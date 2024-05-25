package com.ksm.invoiceapp.service.serviceImpl;

import com.ksm.invoiceapp.exception.EmailNotFound;
import com.ksm.invoiceapp.model.UserEntity;
import com.ksm.invoiceapp.repository.UserRepository;
import com.ksm.invoiceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public Boolean checkEmailAvailability(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(
                ()-> new EmailNotFound("Email not found!")
        );
    }

    @Override
    public UserEntity findUserById(String id){

        return this.userRepository.findById(id).orElseThrow(
                ()-> new UsernameNotFoundException("User not found")
        );
    }


}