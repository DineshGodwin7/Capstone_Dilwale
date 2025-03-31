package com.chef.chef.Repositories;

import com.chef.chef.Models.AdminModel;
import com.chef.chef.Models.ChefModelSignup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChefSignRepo extends JpaRepository<ChefModelSignup, Long> {

    ChefModelSignup findByEmailAndPassword(String email, String password);
}
