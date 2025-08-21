package com.jobspring.service;

import com.jobspring.model.Company;
import com.jobspring.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CompanyService {

    private final CompanyRepository repo;

    public CompanyService(CompanyRepository repo) {
        this.repo = repo;
    }

    public Company create(Company c) {
        if (c.getName() == null) throw new IllegalArgumentException("name is required");
        if (repo.existsByName(c.getName())) throw new IllegalArgumentException("company name already exists");
        return repo.save(c);
    }

    public List<Company> list() { return repo.findAll(); }

    public Company get(Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("company not found"));
    }

    public Company update(Long id, Company patch) {
        Company existing = get(id);
        if (patch.getName() != null) existing.setName(patch.getName());
        if (patch.getWebsite() != null) existing.setWebsite(patch.getWebsite());
        if (patch.getDescription() != null) existing.setDescription(patch.getDescription());
        if (patch.getLocation() != null) existing.setLocation(patch.getLocation());
        return repo.save(existing);
    }

    public void delete(Long id) { repo.delete(get(id)); }
}
