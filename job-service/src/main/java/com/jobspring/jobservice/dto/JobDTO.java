package com.jobspring.jobservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private String title;
    private String company;
    private String location;
    private String category;
    private String description;
    private String redirectUrl;
}
