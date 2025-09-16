package com.example.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = PortfolioApplication.class)
public class PortfolioApplicationTests {

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("BLOG_PASSPHRASE", () -> "testpass");
    }

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String getBaseUrl() {
        return "http://localhost:" + port + "/api/blogposts";
    }

    @Test
    void testGetAllBlogPosts() {
        ResponseEntity<String> response = restTemplate.getForEntity(getBaseUrl(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("title"); // crude check for JSON structure
    }

    @Test
    void testPassphraseVerification() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"passphrase\":\"wrongpass\"}";
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(getBaseUrl() + "/verify", entity, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void testCreateBlogPostWithCorrectPassphrase() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String passphrase = "testpass";
        String body = String.format("{\"passphrase\":\"%s\",\"blogPost\":{\"title\":\"Test Title\",\"date\":\"2025-09-16\",\"message\":\"Test Message\"}}", passphrase);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(getBaseUrl(), entity, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("Test Title");
    }

    @Test
    void testCreateBlogPostWithWrongPassphrase() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"passphrase\":\"wrongpass\",\"blogPost\":{\"title\":\"Should Fail\",\"date\":\"2025-09-16\",\"message\":\"Should Fail\"}}";
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(getBaseUrl(), entity, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void testGetBlogPostById() {
        // First, create a post
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String passphrase = "testpass";
        String body = String.format("{\"passphrase\":\"%s\",\"blogPost\":{\"title\":\"Find Me\",\"date\":\"2025-09-16\",\"message\":\"Find Me\"}}", passphrase);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> postResponse = restTemplate.postForEntity(getBaseUrl(), entity, String.class);
        assertThat(postResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        // Extract ID from response (crude, for portfolio)
        String responseBody = postResponse.getBody();
        String id = responseBody != null ? responseBody.replaceAll(".*\\\"id\\\":(\\d+).*", "$1") : "";
        // Now, get by ID
        ResponseEntity<String> getResponse = restTemplate.getForEntity(getBaseUrl() + "/" + id, String.class);
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody()).contains("Find Me");
    }

    @Test
    void testDeleteBlogPost() {
        // Create a post
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String passphrase = "testpass";
        String body = String.format("{\"passphrase\":\"%s\",\"blogPost\":{\"title\":\"Delete Me\",\"date\":\"2025-09-16\",\"message\":\"Delete Me\"}}", passphrase);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> postResponse = restTemplate.postForEntity(getBaseUrl(), entity, String.class);
        assertThat(postResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        String responseBody = postResponse.getBody();
        String id = responseBody != null ? responseBody.replaceAll(".*\\\"id\\\":(\\d+).*", "$1") : "";
        // Delete
        restTemplate.delete(getBaseUrl() + "/" + id);
        // Confirm deletion
        ResponseEntity<String> getResponse = restTemplate.getForEntity(getBaseUrl() + "/" + id, String.class);
        // Fix: handle null response body
        String deletedBody = getResponse.getBody();
        assertThat(deletedBody == null || !deletedBody.contains("Delete Me")).isTrue();
    }
}