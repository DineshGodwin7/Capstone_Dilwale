package com.chef.chef.Controllers;


import com.chef.chef.Models.ContactModel;

import com.chef.chef.Repositories.ContactRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactRepo contactRepo;

    @PostMapping("/contact")
    public ResponseEntity<String> register(@RequestBody ContactModel user){
        contactRepo.save(user);
        return ResponseEntity.ok("successfully sent");
    }

    @GetMapping("/getAllContacts")
    public ResponseEntity<?> getAllContact(HttpServletRequest request) {
        List<ContactModel> chefs = contactRepo.findAll();

        // Filter response to exclude chefId, password, and certificateLink
        List<Map<String, Object>> filteredChefs = chefs.stream().map(chef -> {
            Map<String, Object> chefData = new HashMap<>();
            chefData.put("Name", chef.getName());
            chefData.put("ChefName", chef.getChefName());
            chefData.put("Event", chef.getEventType());
            chefData.put("Rating", chef.getRating());
            chefData.put("Description", chef.getDescription());
            return chefData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredChefs);
    }

}


