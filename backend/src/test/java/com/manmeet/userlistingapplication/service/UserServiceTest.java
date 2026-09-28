package com.manmeet.userlistingapplication.service;

import com.manmeet.userlistingapplication.dto.CreateUserRequest;
import com.manmeet.userlistingapplication.dto.UserResponse;
import com.manmeet.userlistingapplication.exception.DuplicateEmailException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void createUser_savesNewUser_whenEmailIsUnique() {
        CreateUserRequest request = new CreateUserRequest("Test User", "unique.test.user@example.com");

        UserResponse response = userService.createUser(request);

        assertEquals("Test User", response.name());
        assertEquals("unique.test.user@example.com", response.email());
        assertTrue(response.enabled());
    }

    @Test
    void createUser_throwsDuplicateEmailException_whenEmailAlreadyExists() {
        CreateUserRequest request = new CreateUserRequest("Duplicate User", "duplicate.test@example.com");
        userService.createUser(request);

        assertThrows(DuplicateEmailException.class, () -> userService.createUser(request));
    }
}
