package com.chef.chef.Repositories;

import com.chef.chef.Models.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<ContactModel, Long> {
}
