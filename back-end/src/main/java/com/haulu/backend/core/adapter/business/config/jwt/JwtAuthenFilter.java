package com.haulu.backend.core.adapter.business.config.jwt;

import com.haulu.backend.core.application.port.inbound.implement.CustomUserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

public class JwtAuthenFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    CustomUserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            final String jwt = parseJwt(request);
            if (jwt != null && jwtTokenProvider.validateJwtToken(jwt)) {
                //lay user tu jwt
                String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);
                //lay thong tin user tu username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (Objects.nonNull(userDetails)) {
                    //set thong tin cho security context
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader(JWTConstants.HEADER_STRING);

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(JWTConstants.TOKEN_PREFIX)) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
