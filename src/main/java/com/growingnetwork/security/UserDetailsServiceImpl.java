package com.growingnetwork.security;

import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Collections.emptyList;

@EnableWebSecurity
@Service("UserDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ApplicationUser> user = userRepository.findById(username);
        return user
                .map(applicationUser -> new User(applicationUser.getUsername(), applicationUser.getPassword(), emptyList()))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
    
}
