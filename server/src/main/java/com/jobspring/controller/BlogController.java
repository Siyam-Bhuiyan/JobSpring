package com.jobspring.controller;

import com.jobspring.model.Blog;
import com.jobspring.model.User;
import com.jobspring.service.BlogService;
import com.jobspring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin
public class BlogController {

    private final BlogService service;
    private final UserService userService;

    public BlogController(BlogService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    // REQUIRES AUTHENTICATION - Create blog for authenticated user
    @PostMapping
    public ResponseEntity<Blog> create(@RequestBody Blog blog) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email in our JWT implementation
        
        // Get user details and set as author
        User author = userService.getByEmail(email);
        blog.setAuthor(author);
        
        Blog created = service.create(blog);
        return ResponseEntity.created(URI.create("/api/blogs/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - Create blog for specific user (admin functionality)
    @PostMapping("/user/{userId}")
    public ResponseEntity<Blog> createForUser(@PathVariable Long userId, @RequestBody Blog blog) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Set author from URL parameter
        blog.setAuthor(User.builder().id(userId).build());
        Blog created = service.create(blog);
        return ResponseEntity.created(URI.create("/api/blogs/" + created.getId())).body(created);
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can view all blogs
    @GetMapping
    public List<Blog> list() { 
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.list(); 
    }

    // PUBLIC - Anyone can view published blogs
    @GetMapping("/published")
    public List<Blog> listPublished() { return service.listPublished(); }

    // PUBLIC - Anyone can search blogs
    @GetMapping("/search")
    public List<Blog> search(@RequestParam(name = "q", required = false) String q) {
        return service.search(q);
    }

    // PUBLIC - Anyone can view a specific published blog
    @GetMapping("/{id}")
    public Blog get(@PathVariable Long id) { return service.get(id); }

    // REQUIRES AUTHENTICATION - Get blogs by authenticated user
    @GetMapping("/my-blogs")
    public List<Blog> getMyBlogs() {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email in our JWT implementation
        
        User author = userService.getByEmail(email);
        return service.listByAuthor(author.getId());
    }

    // PUBLIC - Get blogs by specific user
    @GetMapping("/user/{userId}")
    public List<Blog> listByUser(@PathVariable Long userId) { 
        return service.listByAuthor(userId); 
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can update blogs
    @PutMapping("/{id}")
    public Blog update(@PathVariable Long id, @RequestBody Blog patch) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // TODO: Add authorization check - only blog author or admin can update
        return service.update(id, patch);
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can delete blogs
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // TODO: Add authorization check - only blog author or admin can delete
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
