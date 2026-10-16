package com.klef.soa.exam.service;

import com.klef.soa.exam.entity.MobileApp;
import java.util.List;

public interface MobileAppService {
    MobileApp add(MobileApp app);
    List<MobileApp> displayAll();
    MobileApp getById(Long id);
    MobileApp update(Long id, MobileApp app);
    void delete(Long id);
}
