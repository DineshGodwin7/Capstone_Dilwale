package com.chef.chef.Repositories;

import com.chef.chef.Models.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<AdminModel, Long> {

    AdminModel findByEmailAndPassword(String email, String password);

}
