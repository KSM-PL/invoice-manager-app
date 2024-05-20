package com.ksm.invoiceapp.controller;


import com.ksm.invoiceapp.model.UserEntity;
import com.ksm.invoiceapp.repository.UserRepository;
import com.ksm.invoiceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;


//    @GetMapping
//    public List<UserEntity> getAllUsers(){
//
//        //return userRespository.findAll();
//    }
//
//    @PostMapping
//    public UserEntity createUser(@RequestBody UserEntity user) {
//        return userRespository.save(user);
//    }
}
