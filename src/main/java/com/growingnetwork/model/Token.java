package com.growingnetwork.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "tokens_storage")
public class Token implements DbEntity<Long> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "refresh_token")
    private String refreshToken;
    
    @Column(name = "refresh_token_valid_till")
    private Long refreshTokenValidTill;
    
    @Column(name = "forgot_password_token")
    private String forgotPasswordToken;
    
    @Column(name = "forgot_password_token_valid_till")
    private Long forgotPasswordTokenValidTill;
    
    @Column(name = "email_confirmation_id")
    private String emailConfirmationId;
    
    @Column(name = "email_is_confirmed")
    private Boolean emailIsConfirmed;
    
}
