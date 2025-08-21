package com.jobspring.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 6000, nullable = false)
    private String content;

    // EAGER so listing blogs can serialize author without lazy issues
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "author_id")
    private User author;

    // Simple string tags
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "blog_tags", joinColumns = @JoinColumn(name = "blog_id"))
    @Column(name = "tag")
    private List<String> tags;

    // No enum needed
    private Boolean published;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}
