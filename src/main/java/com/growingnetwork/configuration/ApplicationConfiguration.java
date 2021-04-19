package com.growingnetwork.configuration;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.growingnetwork.util.SmartCopyBeanUtilsBean;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.modelmapper.config.Configuration.AccessLevel.PRIVATE;
import static org.modelmapper.convention.MatchingStrategies.STRICT;

@Configuration
public class ApplicationConfiguration {
    
    /**
     * {@link com.amazonaws.regions.Regions} enum.
     * "eu-north-1" is missing there.
     */
    private final String EU_NORTH_1 = "eu-north-1";
    
    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * With credentials from environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
     */
    @Bean
    public AmazonS3Client amazonS3Client() {
        return (AmazonS3Client) AmazonS3ClientBuilder
                .standard()
                .withRegion(EU_NORTH_1)
                .withCredentials(new EnvironmentVariableCredentialsProvider())
                .build();
    }
    
    /**
     * Getting client with default credentials (from file: /user/.aws/config)
     */
//    @Bean
//    public AmazonS3Client amazonS3Client() {
//        return (AmazonS3Client) AmazonS3ClientBuilder
//                .standard()
//                .withRegion(EU_NORTH_1)
//                .build();
//    }
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setMatchingStrategy(STRICT)
                .setFieldMatchingEnabled(true)
                .setSkipNullEnabled(true)
                .setFieldAccessLevel(PRIVATE);
        return mapper;
    }
    
    @Bean
    public SmartCopyBeanUtilsBean smartCopyBeanUtilsBean() {
        return new SmartCopyBeanUtilsBean();
    }
    
}
