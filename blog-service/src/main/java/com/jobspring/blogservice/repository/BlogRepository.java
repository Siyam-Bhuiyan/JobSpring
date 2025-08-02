package com.jobspring.blogservice.repository;

import com.jobspring.blogservice.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByCategoryIgnoreCase(String category);
}
