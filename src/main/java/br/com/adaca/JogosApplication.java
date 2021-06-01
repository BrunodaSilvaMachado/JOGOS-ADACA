package br.com.adaca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"br.com.adaca.repository"})
@EntityScan(basePackages = {"br.com.adaca.model"})
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class JogosApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(JogosApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(JogosApplication.class);
    }
}
