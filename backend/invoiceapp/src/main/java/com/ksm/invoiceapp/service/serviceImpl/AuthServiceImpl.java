package com.ksm.invoiceapp.service.serviceImpl;

import com.ksm.invoiceapp.model.Role;
import com.ksm.invoiceapp.model.UserEntity;
import com.ksm.invoiceapp.repository.RoleRepository;
import com.ksm.invoiceapp.repository.UserRepository;
import com.ksm.invoiceapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Override
    public UserEntity getLoggedUser() {
        String username =
                SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByEmail(username).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));
        return user;
    }


}