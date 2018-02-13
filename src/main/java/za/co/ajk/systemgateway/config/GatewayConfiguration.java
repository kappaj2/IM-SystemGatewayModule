package za.co.ajk.systemgateway.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import io.github.jhipster.config.JHipsterProperties;
import za.co.ajk.systemgateway.gateway.accesscontrol.AccessControlFilter;
import za.co.ajk.systemgateway.gateway.ratelimiting.RateLimitingFilter;
import za.co.ajk.systemgateway.gateway.responserewriting.SwaggerBasePathRewritingFilter;

@Configuration
public class GatewayConfiguration {
    
    @Bean
    @LoadBalanced
    @RefreshScope
    public RestTemplate restTemplate(RestTemplateBuilder builder, ApplicationProperties props) {
        builder.setConnectTimeout(props.getRestTemplateConfig().getConnectTimeout());
        builder.setReadTimeout(props.getRestTemplateConfig().getReadTimeout());
        return builder.build();
    }
    
    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter(){
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, JHipsterProperties jHipsterProperties){
            return new AccessControlFilter(routeLocator, jHipsterProperties);
        }
    }

    /**
     * Configures the Zuul filter that limits the number of API calls per user.
     * <p>
     * This uses Bucket4J to limit the API calls, see {@link za.co.ajk.systemgateway.gateway.ratelimiting.RateLimitingFilter}.
     */
    @Configuration
    @ConditionalOnProperty("jhipster.gateway.rate-limiting.enabled")
    public static class RateLimitingConfiguration {

        private final JHipsterProperties jHipsterProperties;

        public RateLimitingConfiguration(JHipsterProperties jHipsterProperties) {
            this.jHipsterProperties = jHipsterProperties;
        }

        @Bean
        public RateLimitingFilter rateLimitingFilter() {
            return new RateLimitingFilter(jHipsterProperties);
        }
    }
}
