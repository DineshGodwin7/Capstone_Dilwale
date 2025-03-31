package com.chef.chef.Repositories;

import com.chef.chef.Models.ChefModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChefRepo extends JpaRepository<ChefModel, Long> {
    ChefModel findByEmailAndPassword(String email, String password);

}
