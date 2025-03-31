package com.chef.chef.Controllers;
import java.util.HashMap;

import java.util.Map;

import java.util.UUID;


import com.chef.chef.Models.AdminModel;
import com.chef.chef.Models.ChefModel;
import com.chef.chef.Models.ChefModelSignup;
import com.chef.chef.Models.UserModel;
import com.chef.chef.Repositories.AdminRepo;
import com.chef.chef.Repositories.ChefRepo;
import com.chef.chef.Repositories.ChefSignRepo;
import com.chef.chef.Repositories.UserRepo;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

@RestController

@CrossOrigin

public class LoginController {

    public static final Map<String, String> tokenStore = new HashMap<>();

    @Autowired

    private AdminRepo adminRepo;

    @Autowired

    private UserRepo userRepo;

    @Autowired

    private ChefRepo chefRepo;

    @PostMapping("/login")

    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {

        Map<String, String> response = new HashMap<>();

        String email = credentials.get("email");

        String password = credentials.get("password");

        // Check Admin Login

        AdminModel admin = adminRepo.findByEmailAndPassword(email, password);

        if (admin != null) {

            return generateResponse(admin.getEmail(), "Admin", admin.getAdminId(), "admin");

        }

        // Check User Login

        UserModel user = userRepo.findByEmailAndPassword(email, password);

        if (user != null) {

            return generateResponse(user.getEmail(), "User", user.getUserId(), user.getFirstName());

        }

        // Check Chef Login

        ChefModel chef = chefRepo.findByEmailAndPassword(email, password);

        if (chef != null) {

            return generateResponse(chef.getEmail(), "Chef", chef.getChefId(), chef.getFirstName());

        }

        // If no user found

        response.put("Status", "Failed");

        response.put("User", "Not found");

        return ResponseEntity.status(401).body(response);

    }

    private ResponseEntity<Map<String, String>> generateResponse(String email, String role, Long id, String firstName) {

        Map<String, String> response = new HashMap<>();

        String token = UUID.randomUUID().toString();

        tokenStore.put(token, email);

        response.put("Token", token);

        response.put("Status", "Success");

        response.put("UserId", Long.toString(id));

        response.put("Email", email);

        response.put("Role", role);

        response.put("Username", firstName);

        return ResponseEntity.ok(response);

    }

    @GetMapping("/userDetails/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable Long userId) {
        UserModel user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            Map<String, String> response = new HashMap<>();
            response.put("firstName", user.getFirstName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }


}

