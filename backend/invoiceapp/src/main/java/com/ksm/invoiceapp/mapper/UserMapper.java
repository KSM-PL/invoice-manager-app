package com.ksm.invoiceapp.mapper;

import com.ksm.invoiceapp.dto.UserResponseDto;
import com.ksm.invoiceapp.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {
    public static UserResponseDto mapToUserResponseDto(UserEntity userEntity){
        return UserResponseDto.builder()
                .id(userEntity.getId())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .email(userEntity.getEmail())

                .roles(userEntity.getRoles())
                .build();
    }
}
