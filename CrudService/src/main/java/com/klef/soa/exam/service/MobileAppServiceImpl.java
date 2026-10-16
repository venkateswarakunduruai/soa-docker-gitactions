package com.klef.soa.exam.service;

import com.klef.soa.exam.entity.MobileApp;
import com.klef.soa.exam.repository.MobileAppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MobileAppServiceImpl implements MobileAppService {

    @Autowired
    private MobileAppRepository repository;

    @Override
    public MobileApp add(MobileApp app) {
        return repository.save(app);
    }

    @Override
    public List<MobileApp> displayAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
