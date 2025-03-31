package com.chef.chef.Controllers;


import com.chef.chef.Models.ChefModel;
import com.chef.chef.Models.ChefModelSignup;
import com.chef.chef.Models.UserModel;
import com.chef.chef.Repositories.ChefRepo;
import com.chef.chef.Repositories.ChefSignRepo;
import com.chef.chef.Repositories.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class RegisterController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChefSignRepo chefSignRepo;

    @Autowired
    private ChefRepo chefRepo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserModel user){
        userRepo.save(user);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/chefSignReq")
    public ResponseEntity<String> chefRegister(@RequestBody ChefModelSignup user){
        chefSignRepo.save(user);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/chefReg")
    public ResponseEntity<String> chefReg(@RequestBody ChefModel user){
        chefRepo.save(user);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/all")
    public List<ChefModelSignup> getAllPendingChefs() {
        return chefSignRepo.findAll();
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptChef(@PathVariable Long id) {
        Optional<ChefModelSignup> pendingChef = chefSignRepo.findById(id);
        if (pendingChef.isPresent()) {
            ChefModelSignup chef = pendingChef.get();

            ChefModel newChef = new ChefModel(
                    null,
                    chef.getFirstName(),
                    chef.getLastName(),
                    chef.getEmail(),
                    chef.getPassword(),
                    chef.getPhoneNumber(),
                    chef.getSpeciality(),
                    chef.getCertificateLink(),
                    chef.getHourlyRate(),
                    chef.getExperience()
            );

            chefRepo.save(newChef);
            chefSignRepo.deleteById(id);
            return ResponseEntity.ok("Chef accepted and registered successfully.");
        }
        return ResponseEntity.status(404).body("Chef not found.");
    }

    @DeleteMapping("/reject/{id}")
    public ResponseEntity<?> rejectChef(@PathVariable Long id) {
        if (chefSignRepo.existsById(id)) {
            chefSignRepo.deleteById(id);
            return ResponseEntity.ok("Chef signup request rejected.");
        }
        return ResponseEntity.status(404).body("Chef not found.");
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {

        // Fetch all users from the database
        List<UserModel> users = userRepo.findAll();

        // Filter response to exclude userId and password
        List<Map<String, Object>> filteredUsers = users.stream().map(user -> {
            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", user.getUserId());
            userData.put("firstName", user.getFirstName());
            userData.put("lastName", user.getLastName());
            userData.put("email", user.getEmail());
            userData.put("phoneNumber", user.getPhoneNumber());
            return userData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredUsers);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId, HttpServletRequest request) {

        Optional<UserModel> userOptional = userRepo.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body("User not found");
        }

        userRepo.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
}
