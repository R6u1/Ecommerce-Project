package com.ecommerce.controller;

import com.ecommerce.io.ProfileRequest;
import com.ecommerce.io.ProfileResponse;
import com.ecommerce.service.EmailService;
import com.ecommerce.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ProfileController {
    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response=profileService.createProfile(request);
        System.out.println("Sending email to: " + response.getEmail());
        emailService.sendWelcomeEmail(response.getEmail(),response.getName());
        return response;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return profileService.getProfile(email);
    }

}
