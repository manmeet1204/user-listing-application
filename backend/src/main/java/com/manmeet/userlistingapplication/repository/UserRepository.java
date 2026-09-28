package com.manmeet.userlistingapplication.repository;

import com.manmeet.userlistingapplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
