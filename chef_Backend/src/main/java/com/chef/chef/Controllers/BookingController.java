package com.chef.chef.Controllers;

import com.chef.chef.Models.BookingModel;
import com.chef.chef.Repositories.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.chef.chef.Controllers.LoginController.tokenStore;

@RestController
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingRepo bookingRepo;

    // Simulated token storage


    @PostMapping("/book")
    public ResponseEntity<Map<String, String>> createBooking(HttpServletRequest request, @RequestBody BookingModel booking) {
//        String token = request.getHeader("Authorization");
//
//        System.out.println("Received Token: " + token);
//        System.out.println("Token Store: " + tokenStore);

//        if (token == null || !tokenStore.containsKey(token)) {
//            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
//        }

        bookingRepo.save(booking);

        Map<String, String> response = new HashMap<>();
        response.put("status", "Success");
        response.put("message", "Booking successful");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getChefBookings/{chefId}") // Include chefId in the URL
    public ResponseEntity<?> getChefBookings(@PathVariable Long chefId, HttpServletRequest request) {

        // Fetch bookings for the given chefId
        List<BookingModel> bookings = bookingRepo.findByChefId(chefId);

        // Check if there are no bookings
        if (bookings.isEmpty()) {
            return ResponseEntity.status(404).body("No bookings found for this chef.");
        }

        // Transform response (exclude unwanted fields)
        List<Map<String, Object>> filteredBookings = bookings.stream().map(booking -> {
            Map<String, Object> bookingData = new HashMap<>();
            bookingData.put("duration", booking.getDuration());
            bookingData.put("location", booking.getLocation());
            bookingData.put("eventType", booking.getEventType());
            bookingData.put("date", booking.getDate());
            bookingData.put("noOfPeople", booking.getNoOfPeople());
            bookingData.put("arrivalTime", booking.getArrivalTime());
            return bookingData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(filteredBookings);
    }

    @GetMapping("/getAllBookings")
    public ResponseEntity<?> getAllBookings(HttpServletRequest request) {
        List<BookingModel> bookings = bookingRepo.findAll();

        if (bookings.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No bookings available.");
        }

        List<Map<String, Object>> formattedBookings = bookings.stream().map(booking -> {
            Map<String, Object> bookingData = new HashMap<>();
            bookingData.put("bookingId", booking.getBookingId());
            bookingData.put("chefId", booking.getChefId());
            bookingData.put("userId", booking.getUser());
            bookingData.put("duration", booking.getDuration());
            bookingData.put("location", booking.getLocation());
            bookingData.put("eventType", booking.getEventType());
            bookingData.put("date", booking.getDate());
            bookingData.put("noOfPeople", booking.getNoOfPeople());
            bookingData.put("arrivalTime", booking.getArrivalTime());
            return bookingData;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(formattedBookings);
    }





}
