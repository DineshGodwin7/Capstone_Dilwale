package com.chef.chef.Repositories;

import com.chef.chef.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);

    UserModel findByEmailAndPassword(String email, String password);

}
