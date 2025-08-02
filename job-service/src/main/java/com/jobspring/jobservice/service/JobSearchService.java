package com.jobspring.jobservice.service;

import com.jobspring.jobservice.dto.JobDTO;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class JobSearchService {

    private static final String APP_ID = "162150c1";
    private static final String APP_KEY = "8d476db61efb877057df658d7753025b";

    public List<JobDTO> searchJobs(String keyword, String location) {
        List<JobDTO> jobList = new ArrayList<>();

        try {
            OkHttpClient client = new OkHttpClient();

            String url = "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=" + APP_ID +
                    "&app_key=" + APP_KEY +
                    "&results_per_page=10&what=" + keyword +
                    "&where=" + location;

            Request request = new Request.Builder().url(url).build();
            Response response = client.newCall(request).execute();

            if (!response.isSuccessful()) {
                log.error("External API call failed: {}", response.code());
                return jobList;
            }

            String responseBody = response.body().string();
            JSONObject jsonObject = new JSONObject(responseBody);
            JSONArray results = jsonObject.getJSONArray("results");

            for (int i = 0; i < results.length(); i++) {
                JSONObject job = results.getJSONObject(i);
                JobDTO dto = new JobDTO();
                dto.setTitle(job.getString("title"));
                dto.setCompany(job.getJSONObject("company").getString("display_name"));
                dto.setLocation(job.getJSONObject("location").getString("display_name"));
                dto.setCategory(job.getJSONObject("category").getString("label"));
                dto.setDescription(job.getString("description"));
                dto.setRedirectUrl(job.getString("redirect_url"));

                jobList.add(dto);
            }

        } catch (Exception e) {
            log.error("Failed to fetch external jobs: {}", e.getMessage());
        }

        return jobList;
    }
}
