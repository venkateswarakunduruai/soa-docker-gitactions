package com.klef.soa.exam.controller;

import com.klef.soa.exam.entity.MobileApp;
import com.klef.soa.exam.service.MobileAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MobileAppController {

    @Autowired
    private MobileAppService service;

    @GetMapping("/")
    public String home() {
        return "MobileApp CRUD Service is running - Student ID: 2400031389";
    }

    @PostMapping("/Add")
    public ResponseEntity<MobileApp> add(@RequestBody MobileApp app) {
        return new ResponseEntity<>(service.add(app), HttpStatus.CREATED);
    }

    @GetMapping("/DisplayAll")
    public ResponseEntity<List<MobileApp>> displayAll() {
        return new ResponseEntity<>(service.displayAll(), HttpStatus.OK);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity<>("MobileApp with ID " + id + " deleted successfully.", HttpStatus.OK);
    }
}
