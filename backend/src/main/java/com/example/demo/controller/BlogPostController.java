package com.example.demo.controller;

import com.example.demo.model.BlogPost;
import com.example.demo.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogposts")
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Value("${BLOG_PASSPHRASE}")
    private String blogPassphrase;

    public static class BlogPostRequest {
        public String passphrase;
        public BlogPost blogPost;
    }

    @GetMapping
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createBlogPost(@RequestBody BlogPostRequest request) {
        if (!blogPassphrase.equals(request.passphrase)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid passphrase");
        }
        BlogPost saved = blogPostRepository.save(request.blogPost);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public BlogPost getBlogPostById(@PathVariable Long id) {
        return blogPostRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public BlogPost updateBlogPost(@PathVariable Long id, @RequestBody BlogPost updatedPost) {
        return blogPostRepository.findById(id)
            .map(post -> {
                post.setTitle(updatedPost.getTitle());
                post.setDate(updatedPost.getDate());
                post.setMessage(updatedPost.getMessage());
                return blogPostRepository.save(post);
            })
            .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteBlogPost(@PathVariable Long id) {
        blogPostRepository.deleteById(id);
    }
}
