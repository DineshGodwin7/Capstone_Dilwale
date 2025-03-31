package com.chef.chef.Controllers;

import com.chef.chef.Models.ChefModel;
import com.chef.chef.Repositories.ChefRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.chef.chef.Controllers.LoginController.tokenStore;

@RestController
@CrossOrigin
public class ChefController {

    @Autowired
    private ChefRepo chefRepo;

    @GetMapping("/getAllChefs")
    public ResponseEntity<?> getAllChefs(HttpServletRequest request) {
        List<ChefModel> chefs = chefRepo.findAll();

        // Filter response to exclude chefId, password, and certificateLink
        List<Map<String, Object>> filteredChefs = chefs.stream().map(chef -> {
            Map<String, Object> chefData = new HashMap<>();
            chefData.put("chefId", chef.getChefId());
            chefData.put("firstName", chef.getFirstName());
            chefData.put("lastName", chef.getLastName());
            chefData.put("email", chef.getEmail());
            chefData.put("phoneNumber", chef.getPhoneNumber());
            chefData.put("speciality", chef.getSpeciality());
            chefData.put("hourlyRate", chef.getHourlyRate());
            chefData.put("experience", chef.getExperience());
            return chefData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredChefs);
    }

    @DeleteMapping("/deleteChef/{chefId}")
    public ResponseEntity<?> deleteChef(@PathVariable Long chefId, HttpServletRequest request) {


        Optional<ChefModel> chefOptional = chefRepo.findById(chefId);
        if (!chefOptional.isPresent()) {
            return ResponseEntity.status(404).body("Chef not found");
        }

        chefRepo.deleteById(chefId);
        return ResponseEntity.ok("Chef deleted successfully");
    }

    @GetMapping("/getChef/{chefId}")
    public ResponseEntity<?> getChefById(@PathVariable Long chefId) {
        Optional<ChefModel> chefOptional = chefRepo.findById(chefId);

        if (chefOptional.isPresent()) {
            ChefModel chef = chefOptional.get();

            // Filter response to exclude password and certificateLink
            Map<String, Object> chefData = new HashMap<>();
            chefData.put("chefId", chef.getChefId());
            chefData.put("firstName", chef.getFirstName());
            chefData.put("lastName", chef.getLastName());
            chefData.put("email", chef.getEmail());
            chefData.put("phoneNumber", chef.getPhoneNumber());
            chefData.put("speciality", chef.getSpeciality());
            chefData.put("hourlyRate", chef.getHourlyRate());
            chefData.put("experience", chef.getExperience());

            return ResponseEntity.ok(chefData);
        } else {
            return ResponseEntity.status(404).body("Chef not found");
        }
}

    @PostMapping("/updateChef/{chefId}")
    public ResponseEntity<?> updateChef(@PathVariable Long chefId, @RequestBody ChefModel updatedChef, HttpServletRequest request) {

        Optional<ChefModel> existingChefOptional = chefRepo.findById(chefId);
        if (!existingChefOptional.isPresent()) {
            return ResponseEntity.status(404).body("Chef not found");
        }

        ChefModel existingChef = existingChefOptional.get();

        // Updating fields (password and certificateLink not updated for security reasons)
        existingChef.setFirstName(updatedChef.getFirstName());
        existingChef.setLastName(updatedChef.getLastName());
        existingChef.setEmail(updatedChef.getEmail());
        existingChef.setPhoneNumber(updatedChef.getPhoneNumber());
        existingChef.setSpeciality(updatedChef.getSpeciality());
        existingChef.setHourlyRate(updatedChef.getHourlyRate());
        existingChef.setExperience(updatedChef.getExperience());

        chefRepo.save(existingChef);

        return ResponseEntity.ok("Chef details updated successfully");
    }

}
