package com.jobspring.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI iutAPIOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("IUT API")
                        .description("API for iut api services")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("IUT Support")
                                .email("support@iut.com")
                                .url("https://iut-oic.com/support"))
                        .license(new License()
                                .name("IUT License")
                                .url("https://iut-oic.com/license")))
                .servers(List.of(
                        new Server().url("/").description("Default Server URL")
                ));
    }

}
