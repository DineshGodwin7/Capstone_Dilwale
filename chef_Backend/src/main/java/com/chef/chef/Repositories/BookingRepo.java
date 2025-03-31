package com.chef.chef.Repositories;



import com.chef.chef.Models.BookingModel;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepo extends JpaRepository<BookingModel, Long> {

    List<BookingModel> findByChefId(Long chefId);

}


