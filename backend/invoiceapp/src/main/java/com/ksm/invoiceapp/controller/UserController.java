package com.ksm.invoiceapp.controller;


import com.ksm.invoiceapp.model.User;
import com.ksm.invoiceapp.repository.UserRespository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor

public class UserController {

    private final UserRespository userRespository;


    @GetMapping
    public List<User> getAllUsers(){
        return userRespository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRespository.save(user);
    }
}
