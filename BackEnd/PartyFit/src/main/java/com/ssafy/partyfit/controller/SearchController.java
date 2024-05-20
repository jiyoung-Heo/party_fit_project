package com.ssafy.partyfit.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class SearchController {

    @GetMapping("/getLocations")
    public ResponseEntity<String> getLocations(@RequestParam("query") String query) {
        String apiUrl = "https://openapi.naver.com/v1/search/local.json";
        String requestUrl = apiUrl + "?query=" + query+"&display=5&sort=random";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", "UIjhXPuDzSpu59X8biEs");
        headers.set("X-Naver-Client-Secret", "CDuem_4Vxp");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);

        return response;
    }
}
