package com.growingnetwork.repository;

import com.growingnetwork.model.ApplicationUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<ApplicationUser, String> {
    
    @Query("SELECT u FROM ApplicationUser u WHERE u.token.emailConfirmationId = :confirmationId")
    Optional<ApplicationUser> getByEmailConfirmationId(@Param("confirmationId") String emailConfirmationId);
    
    ApplicationUser getByToken_ForgotPasswordToken(String forgotPasswordToken);
    
    Optional<ApplicationUser> findByEmail(String email);
    
    @Query("SELECT u.friends FROM ApplicationUser u WHERE u.username = :username")
    Page<ApplicationUser> getAllUserFriends(String username, Pageable pageable);
    
    @Query("SELECT u FROM ApplicationUser u WHERE LOWER(u.firstName) LIKE %:queryStr% OR LOWER(u.lastName) LIKE %:queryStr%")
    Page<ApplicationUser> findAllByFirstOrLastName(String queryStr, Pageable pageable);
    
    @Query("SELECT u FROM ApplicationUser u WHERE u.username IN (:ids)")
    List<ApplicationUser> getAllUsersFromList(@Param("ids") List<String> ids);
    
    @Query("SELECT u FROM ApplicationUser u WHERE u.lastActivityTime >= :activeTime AND :user MEMBER u.friends")
    Page<ApplicationUser> getActiveFriends(ApplicationUser user, Long activeTime, Pageable pageable);
    
}