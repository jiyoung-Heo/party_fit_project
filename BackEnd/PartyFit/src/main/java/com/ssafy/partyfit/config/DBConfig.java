package com.ssafy.partyfit.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.ssafy.partyfit.model.dao")
public class DBConfig {

}
