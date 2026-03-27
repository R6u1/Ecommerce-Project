package com.ecommerce.service;

import com.ecommerce.io.ProfileRequest;
import com.ecommerce.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest profile);
    ProfileResponse getProfile(String email);
    void sendResetOtp(String email);
    void resetPassword(String email,String otp,String newPassword);
    void sendOtp(String email);
    void verifyOtp(String email, String otp);
}
