package com.klef.soa.exam.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI mobileAppOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("MobileApp CRUD API")
                        .description("SOA Exam - Student ID: 2400031389")
                        .version("1.0"));
    }
}
