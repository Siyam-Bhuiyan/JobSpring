package com.jobspring.service;

import com.jobspring.model.Blog;
import com.jobspring.model.User;
import com.jobspring.repository.BlogRepository;
import com.jobspring.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BlogService {

    private final BlogRepository blogRepo;
    private final UserRepository userRepo;

    public BlogService(BlogRepository blogRepo, UserRepository userRepo) {
        this.blogRepo = blogRepo;
        this.userRepo = userRepo;
    }

    public Blog create(Blog b) {
        if (b.getTitle() == null || b.getContent() == null)
            throw new IllegalArgumentException("title and content are required");
        if (b.getAuthor() == null || b.getAuthor().getId() == null)
            throw new IllegalArgumentException("authorId is required");

        User author = userRepo.findById(b.getAuthor().getId())
                .orElseThrow(() -> new IllegalArgumentException("author not found"));

        b.setAuthor(author);
        if (b.getPublished() == null) b.setPublished(true);

        return blogRepo.save(b);
    }

    @Transactional(readOnly = true)
    public List<Blog> list() {
        return blogRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Blog get(Long id) {
        return blogRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("blog not found"));
    }

    @Transactional(readOnly = true)
    public List<Blog> listByAuthor(Long userId) {
        return blogRepo.findByAuthor_Id(userId);
    }

    @Transactional(readOnly = true)
    public List<Blog> listPublished() {
        return blogRepo.findByPublishedTrue();
    }

    @Transactional(readOnly = true)
    public List<Blog> search(String q) {
        if (q == null || q.isBlank()) return list();
        return blogRepo.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(q, q);
    }

    public Blog update(Long id, Blog patch) {
        Blog existing = get(id);

        if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
        if (patch.getContent() != null) existing.setContent(patch.getContent());
        if (patch.getTags() != null) existing.setTags(patch.getTags());
        if (patch.getPublished() != null) existing.setPublished(patch.getPublished());

        // Optional: allow changing author (usually not needed)
        if (patch.getAuthor() != null && patch.getAuthor().getId() != null) {
            User author = userRepo.findById(patch.getAuthor().getId())
                    .orElseThrow(() -> new IllegalArgumentException("author not found"));
            existing.setAuthor(author);
        }

        return blogRepo.save(existing);
    }

    public void delete(Long id) {
        blogRepo.delete(get(id));
    }
}
