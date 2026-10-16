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
    public MobileApp getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MobileApp not found with id: " + id));
    }

    @Override
    public MobileApp update(Long id, MobileApp app) {
        MobileApp existing = getById(id);
        existing.setAppName(app.getAppName());
        existing.setCategory(app.getCategory());
        existing.setVersion(app.getVersion());
        existing.setDownloads(app.getDownloads());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
