package com.jobspring.controller;

import com.jobspring.model.Company;
import com.jobspring.service.CompanyService;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<Company> create(@RequestBody Company c) {
        Company created = service.create(c);
        return ResponseEntity.created(URI.create("/api/companies/" + created.getId())).body(created);
    }

    @GetMapping
    public List<Company> list() { return service.list(); }

    @GetMapping("/{id}")
    public Company get(@PathVariable Long id) { return service.get(id); }

    @PutMapping("/{id}")
    public Company update(@PathVariable Long id, @RequestBody Company patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
