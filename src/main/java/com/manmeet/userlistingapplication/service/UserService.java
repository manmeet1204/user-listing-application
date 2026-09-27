package com.manmeet.userlistingapplication.service;

import com.manmeet.userlistingapplication.dto.CreateUserRequest;
import com.manmeet.userlistingapplication.dto.UpdateUserRequest;
import com.manmeet.userlistingapplication.dto.UserResponse;
import com.manmeet.userlistingapplication.entity.User;
import com.manmeet.userlistingapplication.exception.DuplicateEmailException;
import com.manmeet.userlistingapplication.exception.UserNotFoundException;
import com.manmeet.userlistingapplication.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers(){
        List<UserResponse> responses = new ArrayList<>();
        for(User user:userRepository.findAll()){
            responses.add(toResponse(user));
        }
        return responses;
    }

    public UserResponse createUser(CreateUserRequest request){
        if(userRepository.existsByEmail(request.email())){
            throw new DuplicateEmailException("Email already in use: " + request.email());
        }

        User user=new  User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setEnabled(true);
        user.setProvider("local");

        User savedUser=userRepository.save(user);
        return toResponse(savedUser);
    }

    public UserResponse updateUser(Long id, UpdateUserRequest request){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User Not Found: " + id));

        user.setName(request.name());
        user.setEnabled(request.enabled());

        User savedUser=userRepository.save(user);
        return toResponse(savedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserResponse toResponse(User user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isEnabled(),
                user.getProvider(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
