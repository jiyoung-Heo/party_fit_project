package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Meet {
    private int meetId;
    private String title;
    private String content;    
    private int maxHeadcount;
    private Date startTime;
    private Date endTime;
    private int status;
    private int partyId;

}
