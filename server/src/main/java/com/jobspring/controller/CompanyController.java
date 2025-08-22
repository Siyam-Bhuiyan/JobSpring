package com.jobspring.controller;

import com.jobspring.model.Company;
import com.jobspring.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can create companies
    @PostMapping
    public ResponseEntity<Company> create(@RequestBody Company c) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Company created = service.create(c);
        return ResponseEntity.created(URI.create("/api/companies/" + created.getId())).body(created);
    }

    // PUBLIC - Anyone can view companies
    @GetMapping
    public List<Company> list() { return service.list(); }

    // PUBLIC - Anyone can view a specific company
    @GetMapping("/{id}")
    public Company get(@PathVariable Long id) { return service.get(id); }

    // REQUIRES AUTHENTICATION - Only authenticated users can update companies
    @PutMapping("/{id}")
    public Company update(@PathVariable Long id, @RequestBody Company patch) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        return service.update(id, patch);
    }

    // REQUIRES AUTHENTICATION - Only authenticated users can delete companies
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
