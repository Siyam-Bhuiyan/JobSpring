package com.jobspring.controller;

import com.jobspring.model.Blog;
import com.jobspring.model.User;
import com.jobspring.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin
public class BlogController {

    private final BlogService service;

    public BlogController(BlogService service) {
        this.service = service;
    }

    // Prefer this: author comes from URL (frontend doesn't pass author in body)
    @PostMapping("/user/{userId}")
    public ResponseEntity<Blog> createForUser(@PathVariable Long userId, @RequestBody Blog blog) {
        blog.setAuthor(User.builder().id(userId).build()); // bind author from URL
        Blog created = service.create(blog);
        return ResponseEntity.created(URI.create("/api/blogs/" + created.getId())).body(created);
    }

    // (Optional) Original create kept for flexibility (body can include author.id)
    @PostMapping
    public ResponseEntity<Blog> create(@RequestBody Blog blog) {
        Blog created = service.create(blog);
        return ResponseEntity.created(URI.create("/api/blogs/" + created.getId())).body(created);
    }

    @GetMapping
    public List<Blog> list() { return service.list(); }

    @GetMapping("/published")
    public List<Blog> listPublished() { return service.listPublished(); }

    @GetMapping("/search")
    public List<Blog> search(@RequestParam(name = "q", required = false) String q) {
        return service.search(q);
    }

    @GetMapping("/{id}")
    public Blog get(@PathVariable Long id) { return service.get(id); }

    @GetMapping("/user/{userId}")
    public List<Blog> listByUser(@PathVariable Long userId) { return service.listByAuthor(userId); }

    @PutMapping("/{id}")
    public Blog update(@PathVariable Long id, @RequestBody Blog patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
