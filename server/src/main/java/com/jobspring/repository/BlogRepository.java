package com.jobspring.repository;

import com.jobspring.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByAuthor_Id(Long userId);
    List<Blog> findByPublishedTrue();
    List<Blog> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String t, String c);
}
