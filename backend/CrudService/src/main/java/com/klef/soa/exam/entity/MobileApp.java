package com.klef.soa.exam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mobileapp")
public class MobileApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String appName;
    private String category;
    private String version;
    private Integer downloads;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAppName() { return appName; }
    public void setAppName(String appName) { this.appName = appName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public Integer getDownloads() { return downloads; }
    public void setDownloads(Integer downloads) { this.downloads = downloads; }
}
