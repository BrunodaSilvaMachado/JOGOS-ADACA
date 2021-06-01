package br.com.adaca.config;

import br.com.adaca.handler.CustomLogoutSuccessHandler;
import br.com.adaca.handler.LoggingAccessDeniedHandler;
import br.com.adaca.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@EnableWebSecurity
class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private LoggingAccessDeniedHandler accessDeniedHandler;

    @Autowired
    private TutorService userService;
    @Autowired
    private CustomLogoutSuccessHandler customLogoutSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(9);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(
                        "/",
                        "/js/**",
                        "/css/**",
                        "/img/**",
                        "/audio/**"
                ).permitAll()
                .antMatchers("/Webapps/**").hasAnyAuthority("TUTOR")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/Jogos/login")
                .defaultSuccessUrl("/Jogos/painel")
                .permitAll()
                .and()
                .rememberMe()
                .key("adaca-12-03-20202T13:03")
                .userDetailsService(userService)
                .tokenValiditySeconds(86400)
                .and()
                .logout()
                .logoutSuccessHandler(customLogoutSuccessHandler)
                .invalidateHttpSession(true)
                .logoutRequestMatcher(new AntPathRequestMatcher("/Jogos/logout"))
                .logoutSuccessUrl("/Jogos/login?logout")
                .permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler);
                /*.and()
                .requiresChannel()
                .anyRequest().requiresSecure();*/
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(passwordEncoder());

        return auth;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
}
