package com.jobspring.model;

import com.jobspring.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "uk_users_email", columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true, length = 180)
    private String email;

    @Column(nullable = false)
    private String password;           // plain text for now (as requested)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;                 // USER, RECRUITER, ADMIN

    private String resumePath;

    @Column(nullable = true)
    private String profilePictureUrl;

    // If you later add a CVData entity, map it here.
    // @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    // private CVData cvData;
}
