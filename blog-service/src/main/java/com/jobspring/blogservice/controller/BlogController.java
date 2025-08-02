package com.jobspring.blogservice.controller;

import com.jobspring.blogservice.model.Blog;
import com.jobspring.blogservice.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepository;

    // 🔹 Create blog
    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }

    // 🔹 Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // 🔹 Get blog by ID
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    // 🔹 Get blogs by category
    @GetMapping("/category/{category}")
    public List<Blog> getByCategory(@PathVariable String category) {
        return blogRepository.findByCategoryIgnoreCase(category);
    }

    // 🔹 Delete blog
    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return "Blog deleted";
        } else {
            return "Blog not found";
        }
    }
}
