package com.growingnetwork.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class MultipartResolverBeanConfig {
    
    /**
     * Used to limit the size of uploaded files.
     * Also, you need to configure the server settings:
     * – [Nginx]: {@linktourl https://stackoverflow.com/questions/2056124/nginx-client-max-body-size-has-no-effect}
     * – [Amazon Nginx (.ebextensions)]: {@linktourl https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-platform-proxy.html}
     */
    private static final int MAX_FILE_SIZE_IN_SERVER = 209715200; // 200 MB
    
    /**
     * Create the multipart resolver Bean. Plus, set the maximum upload file size.
     */
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(MAX_FILE_SIZE_IN_SERVER);
        multipartResolver.setMaxInMemorySize(MAX_FILE_SIZE_IN_SERVER);
        multipartResolver.setMaxUploadSizePerFile(MAX_FILE_SIZE_IN_SERVER);
        return multipartResolver;
    }
    
}
